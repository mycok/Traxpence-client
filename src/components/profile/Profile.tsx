import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, Avatar, Typography, IconButton, TextField, MenuItem, Button } from '@material-ui/core';
import { EditSharp, CloseRounded } from '@material-ui/icons';
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IUser } from '../user';
import CurrentExpenseSummary from '../expenses/summaries/CurrentExpenseSummary';
import CustomTooltip from '../../shared/CustomTooltip';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: 5,
            width: 700
        },
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        editButton: {
            marginTop: 12
        },
        cardContent: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        titleContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        textField: {
            margin: 10,
            width: 400
        },
        expenseTotals: {
            marginLeft: 10,
            fontWeight: 800
        }
    })
)

type ProfileComponentProps = {
    user: Partial<IUser>,
    classes: any,
    currency: string | null,
    handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}
// TODO: consider using a currency component library
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
    {
        value: 'SHS',
        label: 'shs',
    },
];

const user = {
    _id: "453637",
    username: 'test-user1',
    email: 'test-user@gmail.com',
    createdAt: Date.now().toString()
}

function Profile() {
    const classes = useStyles();

    const [currency, setCurrency] = React.useState(localStorage.getItem('currency'));

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrency(event.target.value);
        localStorage.setItem('currency', event.target.value);
    };

    React.useEffect(() => {
        if (!currency) {
            setCurrency(currencies[0].label);
            localStorage.setItem('currency', currencies[0].label)
        }
    }, [currency])

    return (
        <div className={classes.container}>
            <ProfileCard
                classes={classes}
                user={user}
                currency={currency}
                handleChange={handleChange}
            />
        </div>
    )
}


function ProfileCard({ classes, user, currency, handleChange }: Partial<ProfileComponentProps>) {
    return (
        <Card className={classes.root} elevation={5}>
            <CardHeader
                avatar={
                    <Avatar src="" />
                }
                action={
                    <>
                        <CustomTooltip title="Edit" placement="bottom">
                            <IconButton aria-label="edit" className={classes.editButton}>
                                <EditSharp />
                            </IconButton>
                        </CustomTooltip>

                        <Link to="/expenses">
                            <IconButton aria-label="close" className={classes.editButton}>
                                <CloseRounded />
                            </IconButton>
                        </Link>

                    </>
                }
                title={
                    <div className={classes.titleContainer}>
                        <Typography variant="h6">
                            {user?.username}
                        </Typography>
                    </div>
                }
                subheader={
                    <Typography color="primary">{user?.email}</Typography>
                }
            />
            <CardContent className={classes.cardContent}>
                <CurrentExpenseSummary />
            </CardContent>
            <SettingsCard
                classes={classes}
                currency={currency}
                handleChange={handleChange}
            />
            <CardContent className={classes.cardContent}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => null}
                >
                    Sign Out
                </Button>
            </CardContent>
        </Card>
    )
}

function SettingsCard({ classes, currency, handleChange }: Partial<ProfileComponentProps>) {
    return (
        <CardContent className={classes.cardContent}>
            <>
                <Typography>Select Currency</Typography>
                <TextField
                    id="category"
                    variant="standard"
                    className={classes.textField}
                    value={currency ?? ""}
                    select
                    onChange={handleChange}
                >
                    {
                        currencies.map((curr) => (
                            <MenuItem
                                key={curr?.label}
                                value={curr?.label}
                            >
                                {curr?.label}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </>
        </CardContent>
    )
}

export default Profile;