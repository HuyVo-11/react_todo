import React, { useState } from 'react'; //import cái useState vô
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd'; //import các component có sẵn từ atnd
const { Header, Sider, Content } = Layout; //lấy các component con của layout - destructing
const App = () => { //react component

    const [collapsed, setCollapsed] = useState(false); //useState ở đay dùng để lưu trạng thái đóng hay mở của siderbar
    // ban đầu tạo 1 state = false, react trả về 2 thứ - collapsed và setCollapsed
    // nên trong dòng const [collapsed, setCollapsed]  thì  collapsed - có nghĩa là giá trị hiện tại, setCollapsed - là functiuon dùng để thay đổi collapsed.
    // ban đầu copllapsed = flase => sidebar đang mở, khi gọi setCollapsed(true) thì collapsed = true => sidebar thu nhỏ, còn setCollapsed false thì sidebar mở lại
    consol
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed} // truyền state vào component sider.
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Tất cả cv',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Cv cần làm',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Cv đã hoàn thành',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} // thay đổi icon dựa theo state.
                        onClick={() => setCollapsed(!collapsed)} //click vào button sẽ đảo state
                        // ban đầu collapsed = false, thì !collapsed = true, setCollapsed(true) => sidebar đóng 
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;