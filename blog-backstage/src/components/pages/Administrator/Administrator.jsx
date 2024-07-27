import React from "react";
import { useState } from "react";
import { useAuth } from "../../../token/LoginContext";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import MiddleContent from "../../communal/MiddleContent/MiddleContent";
import LeftHeader from "../../communal/LeftHeader/LeftHeader";
import { ins } from "../../../axios/baseUrl";

const Login = () => {
    const { user, setUser } = useAuth();

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });

    const onFinish = (values) => {
        console.log("Success:", values);
        setUserInfo({
            username: values.username,
            password: values.password,
        });
        setUser(true);
        ins({
            url: "login",
            method: "post",
            data: {
                username: values.username,
                password: values.password,
            },
        }).then((res) => {
            console.log(res);
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="账号"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "请输入账号！",
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "请输入密码！",
                    },
                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Checkbox>记住</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

const Administrator = () => {
    return (
        <Layout>
            <LeftHeader active={"administrator"} />
            <Layout>
                <MiddleContent breadcrumb={[{ title: "管理员" }]}>
                    <div
                        style={{
                            width: "100%",
                            height: "90vh",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                        }}>
                        <Login />
                    </div>
                </MiddleContent>
            </Layout>
        </Layout>
    );
};

export default Administrator;
