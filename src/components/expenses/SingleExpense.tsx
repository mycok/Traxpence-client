import React from "react";
import { Card, CardHeader, CardContent, IconButton, Typography, Chip } from "@material-ui/core";
import AccBalanceWallet from "@material-ui/icons/AccountBalanceWalletSharp";
import { EditSharp, DeleteSharp } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { IExpense } from './index';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: 600,
            margin: 5
        },
        editButton: {
            marginLeft: 10
        },
        deleteButton: {
            color: theme.palette.secondary.main
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

function SingleExpense({ expense }: ExpenseComponentProps) {
    const classes = useStyles();

    const [currency] = React.useState(localStorage.getItem("currency") ?? "");

    return (
        <Card className={classes.root} elevation={5}>
            <CardHeader
                avatar={
                    <AccBalanceWallet fontSize="large" />
                }
                title={
                    <div className={classes.titleContainer}>
                        <>
                            <Typography variant="h6">
                                {expense?.title}
                            </Typography>
                            <Chip
                                variant="outlined"
                                color="primary"
                                size="small"
                                label={expense?.category?.title}
                            />
                        </>
                    </div>
                }
                subheader={
                    <>
                        <Typography color="primary">{`${currency} ${expense?.amount}`}</Typography>
                        <Typography variant="caption">{expense?.incurredOn}</Typography>
                    </>
                }
                action={
                    <>
                        <Link to={{
                            pathname: "/edit-expense",
                            state: expense
                        }}>
                            <IconButton aria-label="edit" className={classes.editButton}>
                                <EditSharp />
                            </IconButton>
                        </Link>
                        <IconButton aria-label="delete" className={classes.deleteButton}>
                            <DeleteSharp />
                        </IconButton>
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