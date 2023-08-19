import {IButtonTypes, buttonTypes} from "@followBack/GenericElements/Button/types";


export const typesToButtons: Record<buttonTypes, IButtonTypes> = {
    "primary": {
        mode: "contained",
        textType: "largeRegularBody",
        textColorType: "primary"
    },
    "secondary": {
        mode: "text",
        textType: "largeRegularBody",
        textColorType: "secondary",
        textDecoration: "underline",
        showLabelStyle: true,
    },
    "ternary": {
        mode: "text",
        textType: "smallRegularBody",
        textColorType: "secondary",
        showLabelStyle: true
    },
    "mediumTernary": {
        mode: "text",
        textType: "largeRegularBody",
        textColorType: "secondary",
        showLabelStyle: true
    }
};


