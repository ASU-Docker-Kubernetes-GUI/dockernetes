import React, { ReactNode } from "react";
import {Classes} from "@blueprintjs/core";

type AppProps = {
    children: ReactNode;
}

export default function App(props: AppProps) {
    const { children } = props;
    return <div>{ children }</div>;
}