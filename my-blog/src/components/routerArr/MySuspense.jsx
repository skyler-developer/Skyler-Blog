import { Suspense } from "react";

function MySuspense(props) {
    return <Suspense fallback={<div>loading...</div>}>{props.children}</Suspense>;
}

export default MySuspense;
