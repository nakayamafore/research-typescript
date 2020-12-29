import React, { Fragment } from "react";
import { TextField, Grid, InputLabel, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Career as ICareer } from "../domain/entity/career";
import profileActions from "../store/profile/actions";
import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";
import { exitEmptyCareers } from "../domain/services/career";

const Career = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const careers = useSelector((state: RootState) => state.profile.careers);
    const isAbleToAddCarrer = exitEmptyCareers(careers);
    const validation = useSelector((state: RootState) => state.validation)

    const handleChange = (member: Partial<ICareer>, i: number) => {
        dispatch(profileActions.setCareer({ career: member, index: i }))
    }
    const handleAddCareer = () => {
        dispatch(profileActions.addCareer({}));
    }
    const handleDeleteCareer = (i: number) => {
        dispatch(profileActions.deleteCareer(i));
    }
    return (
        <>
            {careers.map((c, i) => (
                <Fragment key={i}>
                    <Typography variant="h5" component="h3" className={classes.title}>
                        職歴{i + 1}
                    </Typography>
                    <TextField className={classes.formField} fullWidth label={PROFILE.CAREERS.COMPANY} value={c.company}
                        onChange={e => handleChange({ company: e.target.value }, i)}
                        error={!!validation.message.careers[i]?.company} helperText={validation.message.careers[i]?.company} />
                    <TextField className={classes.formField} fullWidth label={PROFILE.CAREERS.POSITION} value={c.position}
                        onChange={e => handleChange({ position: e.target.value }, i)}
                        error={!!validation.message.careers[i]?.position} helperText={validation.message.careers[i]?.position} />
                    <div className={classes.careerSpan}>
                        <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
                        <Grid container spacing={1} alignContent="space-between" alignItems="center">
                            <Grid item xs={5}>
                                <TextField fullWidth type="month" InputLabelProps={{ shrink: true }} value={c.startAt}
                                    onChange={e => handleChange({ startAt: e.target.value }, i)}
                                    error={!!validation.message.careers[i]?.startAt} helperText={validation.message.careers[i]?.startAt} />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="center">〜</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField fullWidth type="month" InputLabelProps={{ shrink: true }} value={c.endAt}
                                    onChange={e => handleChange({ endAt: e.target.value }, i)}
                                    error={!!validation.message.careers[i]?.endAt} helperText={validation.message.careers[i]?.endAt} />
                            </Grid>
                        </Grid>
                    </div>
                    <Button className={classes.button} onClick={() => handleDeleteCareer(i)} variant="outlined" color="secondary">
                        職歴{i + 1} を削除
                    </Button>
                </Fragment>
            ))}
            <Button className={classes.button} onClick={handleAddCareer} fullWidth variant="outlined" disabled={isAbleToAddCarrer}>
                職歴の追加
            </Button>
        </>
    )
}
export default Career;