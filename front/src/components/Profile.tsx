import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { calculateValidation } from "../domain/services/validation";
import validationsActions from "../store/validation/actions";


import Basic from "./Basic";
import Address from "./Address";
import useStyles from "./styles";
import Career from "./Career";
import College from "./College";

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);

    const handleSave = () => {
        const message = calculateValidation(profile);
        dispatch(validationsActions.setValidation(message));
        dispatch(validationsActions.setIsStartvalidation(true))
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" className={classes.title} color="primary">
                基本情報
            </Typography>
            <Basic />
            <Typography variant="h4" component="h2" className={classes.title} color="primary">
                住所
            </Typography>
            <Address />
            <Typography variant="h4" component="h2" className={classes.title} color="primary">
                学歴
            </Typography>
            <College />
            <Typography variant="h4" component="h2" className={classes.title} color="primary">
                職歴
            </Typography>
            <Career />
            <Button fullWidth className={classes.button} onClick={handleSave} variant="outlined" color="primary">
                保存
            </Button>
        </Container>
    )
}
export default Profile;