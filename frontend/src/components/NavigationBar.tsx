import React from "react";
import {
    Alignment,
    AnchorButton,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading
} from "@blueprintjs/core";

import Route from '../constants/routes.json';

import { Link } from "react-router-dom";

type NavigationBarProps = {
    isLoading: boolean;
}

export default function Navigation(props: NavigationBarProps): React.ReactElement {
    const { isLoading } = props;
    const elementIsLoading = isLoading ? Classes.SKELETON : "";

    return (<Navbar className={Classes.DARK} fixedToTop>
        <NavbarGroup align={Alignment.LEFT} >
            <NavbarHeading
                className={elementIsLoading}
            >Dockernetes</NavbarHeading>
            <NavbarDivider/>
            <Link to={Route.CONTAINERS}>
                <Button text="containers"/>

            </Link>
            <AnchorButton
                href="http://blueprintjs.com/docs/v2/"
                text="Docs"
                target="_blank"
                minimal
                rightIcon="share"
                className={elementIsLoading}
            />
            <AnchorButton
                href="http://github.com/palantir/blueprint"
                text="Github"
                target="_blank"
                minimal
                rightIcon="code"
                className={elementIsLoading}
            />
        </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <AnchorButton
                    href="http://github.com/palantir/blueprint"
                    text="Settings"
                    target="_blank"
                    minimal
                    rightIcon="code"
                    className={elementIsLoading}
                />
            </NavbarGroup>
    </Navbar>
    );
}