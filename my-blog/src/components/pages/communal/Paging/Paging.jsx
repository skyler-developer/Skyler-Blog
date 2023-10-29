import React from "react";
import { Pagination } from "antd";

const Paging = ({ pageOnChange, contentTotal }) => {
    function onChange(page, pageSize) {
        pageOnChange(page);
    }
    return (
        <Pagination
            onChange={onChange}
            defaultCurrent={1}
            total={contentTotal}
            showSizeChanger={false}
            defaultPageSize={5}
        />
    );
};
export default Paging;
