import React, { useEffect, useState } from "react";
import { Layout, Input, Select, Button, Space, Modal } from "antd";
import LeftHeader from "../../../communal/LeftHeader/LeftHeader";
import MiddleContent from "../../../communal/MiddleContent/MiddleContent";
import Edit from "../../../communal/Edit/Edit";
import BottomFooter from "../../../communal/BottomFooter/BottomFooter";
import axios from "axios";
import baseUrl from "../../../../axios/baseUrl";
import { useNavigate } from "react-router-dom";

const ModifyBlog = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); //确认删除提示框
    const [deleteId, setDeleteId] = useState(false); //删除文章id
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        handleDeleteClick(deleteId);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [data, setData] = useState(null);
    const getData = () => {
        console.log("demo24");
        axios({
            url: `${baseUrl}/allarticle`,
            method: "get",
        })
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    const handleDeleteClick = (id) => {
        axios({
            url: `${baseUrl}/deleteblog/${id}`,
            method: "get",
        })
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleModifyClick = (id) => {
        navigate(`/blogmanage/addblog?id=${id}`);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader active={"modify"} />
            <Layout>
                <MiddleContent>
                    <Space wrap={true} size="large" align="center">
                        {data &&
                            data.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "75vw",
                                            minHeight: "5vh",
                                            backgroundColor: "#bfc",
                                            margin: "1vh 0",
                                            fontSize: "1rem",
                                            color: "rgb(22, 119, 255)",
                                        }}>
                                        <div style={{ margin: "0 1vw" }}>
                                            标题：{"\u00A0\u00A0\u00A0"}
                                            {item.title}
                                        </div>
                                        <div style={{ margin: "0 1vw" }}>
                                            {" "}
                                            类型：{"\u00A0\u00A0\u00A0"}
                                            {item.kind}
                                        </div>
                                        <div style={{ margin: "0 1vw" }}>
                                            发布时间：{"\u00A0\u00A0\u00A0"}
                                            {item.time}
                                        </div>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                handleModifyClick(item.id);
                                            }}
                                            style={{ margin: "0 2vw" }}>
                                            修改
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setDeleteId(item.id);
                                                showModal();
                                            }}>
                                            删除
                                        </Button>
                                    </div>
                                );
                            })}
                        <Modal
                            title="是否确认删除？"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}>
                            <p>操作不可逆，谨慎选择</p>
                        </Modal>
                    </Space>
                </MiddleContent>
                <BottomFooter />
            </Layout>
        </Layout>
    );
};

export default ModifyBlog;
