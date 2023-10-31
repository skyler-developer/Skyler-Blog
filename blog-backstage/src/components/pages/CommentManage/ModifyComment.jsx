import React from "react";
import { useState, useEffect } from "react";
import { Layout } from "antd";
import LeftHeader from "../../communal/LeftHeader/LeftHeader";
import MiddleContent from "../../communal/MiddleContent/MiddleContent";
import BottomFooter from "../../communal/BottomFooter/BottomFooter";
import { Button, Space, Modal } from "antd";
import axios from "axios";
import baseUrl from "../../../axios/baseUrl";

const ModifyComment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); //确认删除提示框

    const [deleteId, setDeleteId] = useState(false); //删除评论id

    const [commentData, setCommentData] = useState(null);

    const getData = () => {
        axios({
            url: `${baseUrl}/allremark`,
            method: "get",
        })
            .then((res) => {
                console.log(res);
                setCommentData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

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

    const handleDeleteClick = (id) => {
        axios({
            url: `${baseUrl}/deleteremark/${id}`,
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

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}>
            <LeftHeader active={"modifycomment"} />
            <Layout>
                <MiddleContent breadcrumb={[{ title: "评论管理" }, { title: "修改评论" }]}>
                    <Space wrap={true} size="large" align="center">
                        {commentData &&
                            commentData.map((item) => {
                                return (
                                    <div
                                        key={item.remarkId}
                                        style={{
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "75vw",
                                            minHeight: "5vh",
                                            backgroundColor: "#bfc",
                                            margin: "1vh 0",
                                            padding: "1vh 1vw",
                                            fontSize: "1.2rem",
                                            color: "rgb(22, 119, 255)",
                                            lineHeight: "2rem",
                                        }}>
                                        评论ID：{item.remarkId}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        评论内容：{item.content}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        关联文章：{item.relatedArticles}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        用户ID：{item.userId}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        用户邮箱：{item.userEmail}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        评论深度：{item.deep}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        上级用户ID：{item.priorUserId}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        上级评论ID：{item.priorRemarkId}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        顶级评论ID：{item.topRemarkId}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        评论时间：{item.time}
                                        {"\u00A0\u00A0\u00A0\u00A0\u00A0"}
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setDeleteId(item.remarkId);
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

export default ModifyComment;
