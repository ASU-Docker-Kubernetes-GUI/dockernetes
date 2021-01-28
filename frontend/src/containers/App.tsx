import { ReactNode } from "react";

type AppProps = {
    children: ReactNode;
}

const theme = {};

export default function App(props: AppProps) {
    const { children } = props;
    return <>{ children }</>;
}