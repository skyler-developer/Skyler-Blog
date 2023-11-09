import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Space } from "antd";
import { Select } from "antd";
import axios from "axios";
import baseUrl from "../../../../axios/baseUrl";

const MySelect = ({ getWeatherMessage }) => {
    const [addressMessage, setAddressMessage] = useState(null);
    const [addressAdcode, setAddressAdcode] = useState(null);

    const onChange = (value) => {
        console.log(`selected ${value}`);
        localStorage.setItem("address", value);
        setAddressAdcode(value);
    };
    const onSearch = (searchValue) => {
        console.log("search:", searchValue);
    };
    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        setAddressAdcode(localStorage.getItem("address"));
        axios({
            url: `${baseUrl}/address`,
            method: "get",
        })
            .then((res) => {
                const addressData = res.data;
                const newAddressData = addressData.map((item) => {
                    return {
                        label: item.name,
                        value: item.adcode,
                    };
                });
                setAddressMessage(newAddressData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (addressAdcode != null) {
            axios({
                url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${addressAdcode}&key=b0d3d8e51cfd8cfaa2027a8f097ae08c`,
                method: "get",
            }).then((res) => {
                console.log(res.data.lives[0]);
                console.log(getWeatherMessage);

                getWeatherMessage(res.data.lives[0]);
            });
        } else {
            axios({
                url: `https://restapi.amap.com/v3/weather/weatherInfo?city=410100&key=b0d3d8e51cfd8cfaa2027a8f097ae08c`,
                method: "get",
            }).then((res) => {
                console.log(res.data.lives[0]);
                console.log(getWeatherMessage);

                getWeatherMessage(res.data.lives[0]);
            });
        }
    }, [addressAdcode]);

    console.log(addressAdcode);
    return (
        <Select
            style={{ width: "8vw" }}
            size="small"
            showSearch
            placeholder="选择地区"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={addressMessage}
        />
    );
};
const WeatherCard = () => {
    const [weatherMessage, setWeatherMessage] = useState(null);
    const [weatherTip, setWeatherTip] = useState(null);
    const [weatherSrc, setWeatherSrc] = useState("http://www.skyler.fun/cloudWeather.webp");
    const getWeatherMessage = (message) => {
        console.log(message);
        if (message.temperature <= 15) {
            setWeatherTip("Skyler提醒您：今日天气较冷，请多穿秋裤，注意防寒保暖！");
        } else if (message.temperature <= 28 && message.temperature > 15) {
            setWeatherTip("Skyler提醒您：今日天气不错，出门看看亲爱的地球吧！");
        } else if (message.temperature > 28) {
            setWeatherTip("Skyler提醒您：炎热的天气最适合来一个香草冰淇淋了！");
        }
        setWeatherMessage(message);
        if (
            message.weather === "晴" ||
            message.weather === "少云" ||
            message.weather === "晴间多云" ||
            message.weather === "有风" ||
            message.weather === "平静" ||
            message.weather === "微风" ||
            message.weather === "和风" ||
            message.weather === "清风" ||
            message.weather === "热" ||
            message.weather === "未知"
        ) {
            setWeatherSrc("http://www.skyler.fun/sunWeather.webp");
        } else if (
            message.weather === "多云" ||
            message.weather === "阴" ||
            message.weather === "强风/劲风" ||
            message.weather === "疾风" ||
            message.weather === "大风" ||
            message.weather === "烈风" ||
            message.weather === "风暴" ||
            message.weather === "狂爆风" ||
            message.weather === "飙风" ||
            message.weather === "热带风暴" ||
            message.weather === "霾" ||
            message.weather === "中度霾" ||
            message.weather === "重度霾" ||
            message.weather === "严重霾" ||
            message.weather === "浮尘" ||
            message.weather === "扬沙" ||
            message.weather === "沙尘暴" ||
            message.weather === "强沙尘暴" ||
            message.weather === "龙卷风" ||
            message.weather === "雾" ||
            message.weather === "浓雾" ||
            message.weather === "强浓雾" ||
            message.weather === "轻雾" ||
            message.weather === "大雾" ||
            message.weather === "特强浓雾" ||
            message.weather === "冷"
        ) {
            setWeatherSrc("http://www.skyler.fun/cloudWeather.webp");
        } else if (
            message.weather === "雪" ||
            message.weather === "阵雪" ||
            message.weather === "小雪" ||
            message.weather === "中雪" ||
            message.weather === "大雪" ||
            message.weather === "暴雪" ||
            message.weather === "小雪-中雪" ||
            message.weather === "中雪-大雪" ||
            message.weather === "大雪-暴雪"
        ) {
            setWeatherSrc("http://www.skyler.fun/snowWeather.webp");
        } else {
            setWeatherSrc("http://www.skyler.fun/rainWeather.webp");
        }
    };
    return (
        <Space direction="vertical" size={16}>
            <Card
                title="今日天气"
                hoverable
                cover={<img alt="天气情况" src={weatherSrc} />}
                extra={<MySelect getWeatherMessage={getWeatherMessage} />}
                style={{
                    width: "15vw",
                }}>
                {weatherMessage && (
                    <>
                        <p>
                            当前省份:{"\u00A0"}
                            {weatherMessage.province}
                        </p>
                        <p>
                            当前地区:{"\u00A0"}
                            {weatherMessage.city}
                        </p>

                        <p>
                            更新时间:{"\u00A0"}
                            {weatherMessage.reporttime}
                        </p>
                        <p>
                            天气状况:{"\u00A0"}
                            {weatherMessage.weather}
                        </p>

                        <p>
                            当前温度:{"\u00A0"}
                            {weatherMessage.temperature}
                        </p>
                        <div
                            style={{
                                color: "rgb(22, 119, 255)",
                                fontFamily: "fantasy",
                                fontSize: "1.1rem",
                            }}>
                            {weatherTip}
                        </div>
                    </>
                )}
            </Card>
        </Space>
    );
};
export default WeatherCard;
