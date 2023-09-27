import { memo } from "react";

const Menu = () => {
    return (
        <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
            <li>Menu 4</li>
        </ul>
    )
};

export default memo(Menu);