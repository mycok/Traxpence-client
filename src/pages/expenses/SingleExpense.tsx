import React from "react";
import { Card, CardHeader, CardContent, IconButton, Typography } from "@material-ui/core";
import AccBalanceWallet from "@material-ui/icons/AccountBalanceWalletSharp";
import EditIcon from "@material-ui/icons/EditSharp";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IExpense } from './index';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 600,
            margin: 5
        },
        editButton: {
            marginTop: 12
        },
        cardContent: {
            marginLeft: 50,
            marginRight: 50
        },
        categoryLabel: {
            marginRight: 15,
            fontWeight: 900
        },
        titleContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }
    })
)

type ExpenseComponentProps = {
    expense: IExpense
}

const currency = "$"

function SingleExpense({ expense }: ExpenseComponentProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={5}>
            <CardHeader
                avatar={
                    <AccBalanceWallet fontSize="large" />
                }
                action={
                    <IconButton aria-label="edit" className={classes.editButton}>
                        <EditIcon />
                    </IconButton>
                }
                title={
                    <div className={classes.titleContainer}>
                        <Typography variant="h6">
                            {expense?.name}
                        </Typography>
                        <Typography variant="caption" className={classes.categoryLabel}>
                            {expense?.category?.title}
                        </Typography>
                    </div>
                }
                subheader={
                    <>
                        <Typography color="primary">{`${currency} ${expense?.amount}`}</Typography>
                        <Typography variant="caption">{expense?.incurredOn}</Typography>
                    </>
                }
            />
            {
                expense?.notes && (
                    <CardContent className={classes.cardContent}>
                        <Typography>{expense?.notes}</Typography>
                    </CardContent>
                )
            }
        </Card>
    )
}

export default SingleExpense;