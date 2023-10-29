import React from "react";

import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Input } from "antd";
import { Button, Space } from "antd";
import { Tooltip } from "antd";
import { Divider, Avatar } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import Paging from "../Paging/Paging";

const { TextArea } = Input;

const EditRemark = ({
    relatedArticleId,
    deep,
    topRemarkId,
    priorUserId,
    priorRemarkId,
    addRemarkDataLength,
}) => {
    const [remark, setRemark] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const userIdCookie = Cookies.get("userId");

        setUserId(userIdCookie);
    }, []);

    const onChangeContent = (e) => {
        setRemark(e.target.value);
    };
    const onChangeUserId = (e) => {
        setUserId(e.target.value);
    };
    const onChangeUserEmail = (e) => {
        setUserEmail(e.target.value);
    };

    const handleSubmit = async () => {
        await axios({
            withCredentials: "include",
            method: "post",
            data: {
                content: remark,
                relatedArticles: relatedArticleId,
                userId: userId,
                userEmail: userEmail,
                topRemarkId: topRemarkId,
                priorUserId: priorUserId,
                priorRemarkId: priorRemarkId,
                deep: deep,
            },
            url: "http://127.0.0.1:3007/api/saveremark",
        })
            .then((res) => {
                console.log(res);
                addRemarkDataLength();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <TextArea
                showCount
                style={{
                    height: 120,
                    resize: "none",
                    marginBottom: "3vh",
                }}
                onChange={onChangeContent}
                placeholder={
                    priorUserId
                        ? `回复${priorUserId}`
                        : "良言一句三冬暖，恶语伤人六月寒，阿巴巴巴，请友善评论"
                }
            />
            <Space
                align="center"
                wrap={true}
                style={{ display: "flex", justifyContent: "space-between", marginBottom: "3vh" }}>
                <Tooltip
                    title="输入QQ将自动获取你的头像和昵称，以用来显示评论（必填）"
                    color="rgb(16, 142, 233)">
                    <Input
                        onChange={onChangeUserId}
                        className="qqNumber"
                        type="number"
                        showCount
                        maxLength={10}
                        placeholder="你的QQ号（必填）"
                        value={userId}
                        style={{ width: "20vw" }}
                    />
                </Tooltip>
                <Tooltip title="如果有问题我会通过邮箱联系你（可选填）" color="rgb(16, 142, 233)">
                    <Input
                        onChange={onChangeUserEmail}
                        type="email"
                        showCount
                        placeholder="你的邮箱（可选填）"
                        style={{ width: "22vw" }}
                    />
                </Tooltip>
                <Button type="primary" style={{ fontSize: "1rem" }} onClick={handleSubmit}>
                    发送
                </Button>
            </Space>
        </>
    );
};

const OneRemark = ({
    content,
    isView,
    id,
    controlView,
    allRemarkDate,
    relatedArticleId,
    addRemarkDataLength,
}) => {
    const [replyDate, setReplyDate] = useState({
        priorUserId: content.userId,
        priorRemarkId: content.remarkId,
    });

    const handleFirstReply = () => {
        controlView(id);
    };
    const handleSecondReply = (item) => {
        controlView(id);
        setReplyDate({
            priorUserId: item.userId,
            priorRemarkId: item.remarkId,
        });
    };
    const secondDate = allRemarkDate.filter((cur) => {
        if (cur.topRemarkId == content.remarkId) {
            return cur;
        }
    });
    return (
        <>
            <div style={{ marginBottom: "2vh" }}>
                {/* 一级评论 */}
                <div style={{ marginBottom: "2vh" }}>
                    <Avatar
                        size="large"
                        src={`https://q4.qlogo.cn/g?b=qq&nk=${content.userId}&s=100`}
                    />
                    <span style={{ margin: "0 2vw", fontSize: "1rem" }}>{content.userId}</span>
                    <span
                        style={{ margin: "0 2vw", color: "rgb(153, 153, 153)", fontSize: "1rem" }}>
                        {content.time}
                    </span>
                    <Button
                        type="primary"
                        size="small"
                        style={{ fontSize: "1rem" }}
                        onClick={handleFirstReply}>
                        {!isView ? "回复" : "取消"}
                    </Button>
                    <div
                        style={{
                            marginTop: "2vh",
                            fontSize: "1rem",
                        }}>
                        {content.content}
                    </div>
                </div>

                {/* 二级评论 */}
                {secondDate &&
                    secondDate.map((item) => {
                        return (
                            <div
                                style={{ marginLeft: "2vw", marginBottom: "2vh" }}
                                key={item.remarkId}>
                                <Avatar
                                    size="middle"
                                    src={`https://q4.qlogo.cn/g?b=qq&nk=${item.userId}&s=100`}
                                />
                                <span style={{ margin: "0 2vw", fontSize: "0.9rem" }}>
                                    {item.userId}
                                </span>
                                <span
                                    style={{
                                        margin: "0 2vw",
                                        color: "rgb(153, 153, 153)",
                                        fontSize: "1rem",
                                    }}>
                                    {item.time}
                                </span>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={() => {
                                        handleSecondReply(item);
                                    }}
                                    style={{ fontSize: "0.9rem" }}>
                                    {!isView ? "回复" : "取消"}
                                </Button>
                                <div
                                    style={{
                                        marginTop: "3vh",
                                        fontSize: "0.9rem",
                                    }}>
                                    {item.content}
                                </div>
                            </div>
                        );
                    })}
            </div>
            {isView && (
                <EditRemark
                    relatedArticleId={relatedArticleId}
                    deep={1}
                    topRemarkId={content.remarkId}
                    priorUserId={replyDate.priorUserId}
                    priorRemarkId={replyDate.priorRemarkId}
                    addRemarkDataLength={addRemarkDataLength}
                />
            )}
            <Divider />
        </>
    );
};

const RemarkArea = ({ relatedArticleId }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [allRemarkDate, setAllRemarkDate] = useState(null);
    const [firstRemarkDate, setFirstRemarkDate] = useState(null);
    const [newFirstRemarkDate, setNewFirstRemarkDate] = useState(null);
    const [remarkDateLength, setRemarkDateLength] = useState(null);
    useEffect(() => {
        const p1 = axios({
            method: "get",
            url: `http://127.0.0.1:3007/api/remark/${relatedArticleId}`,
        });
        const p2 = p1.then(async (res) => {
            const allData = res.data.reverse();
            setAllRemarkDate(allData);
            setRemarkDateLength(allData.length);
            setFirstRemarkDate(allData.filter((item) => item.deep === 0));
            setNewFirstRemarkDate(
                allData
                    .filter((item) => item.deep === 0)
                    .slice((pageNumber - 1) * 5, (pageNumber - 1) * 5 + 5),
            );
        });
    }, [remarkDateLength, pageNumber]);

    const [controlEditView, setControlEditView] = useState([true, false, false, false]);

    const addRemarkDataLength = () => {
        setRemarkDateLength(remarkDateLength + 1);
    };

    const pageOnChange = (number) => {
        setPageNumber(number);
    };

    const controlView = (id) => {
        const preControlEditView = Array.from({ length: controlEditView.length }, () => false);
        if (controlEditView[id]) {
            setControlEditView(() => {
                preControlEditView[0] = true;
                return preControlEditView;
            });
        } else {
            setControlEditView(() => {
                preControlEditView[id] = true;
                return preControlEditView;
            });
        }
    };
    console.log(firstRemarkDate);
    return (
        <Col
            span={12}
            offset={6}
            style={{
                minHeight: "30vh",
                backgroundColor: "rgb(255,255,255)",
                border: "1px solid rgb(212, 212, 213)",

                marginBottom: "5vh",
                padding: "1vw",
            }}>
            <div style={{ marginBottom: "1vh", color: "rgb(22, 119, 255)", fontSize: "1.2rem" }}>
                发布评论,共
                {"\u00A0"}
                {allRemarkDate && allRemarkDate.length}
                {"\u00A0"}
                条评论
            </div>
            {controlEditView[0] && (
                <EditRemark
                    relatedArticleId={relatedArticleId}
                    deep={0}
                    topRemarkId={null}
                    priorUserId={null}
                    priorRemarkId={null}
                    addRemarkDataLength={addRemarkDataLength}
                />
            )}
            {firstRemarkDate && (
                <>
                    <Space direction="vertical" size="small">
                        {newFirstRemarkDate.map((item, index) => {
                            return (
                                <OneRemark
                                    key={item.remarkId}
                                    content={item}
                                    isView={controlEditView[index + 1]}
                                    id={index + 1}
                                    controlView={controlView}
                                    allRemarkDate={allRemarkDate}
                                    relatedArticleId={relatedArticleId}
                                    addRemarkDataLength={addRemarkDataLength}
                                />
                            );
                        })}
                    </Space>
                    {<Row>
                        <Col
                            span={24}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Paging
                                pageOnChange={pageOnChange}
                                contentTotal={firstRemarkDate.length}
                            />
                        </Col>
                    </Row>}
                </>
            )}
        </Col>
    );
};

export default RemarkArea;