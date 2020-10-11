import React, { ChangeEvent } from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, IconButton, TextField, MenuItem } from '@material-ui/core';
import { EditSharp } from '@material-ui/icons';
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IUser } from '../user';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 600,
            margin: 5,
            height: 400
        },
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        editButton: {
            marginTop: 12
        },
        cardContent: {
            marginLeft: 50,
            marginRight: 50
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

type ProfileProps = {
    user: Partial<IUser>,
    classes: any,
    currency: string,
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
    
    const [currency, setCurrency] = React.useState('EUR');

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        setCurrency(event.target.value);
        localStorage.setItem('currency', event.target.value);
    };

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


function ProfileCard({ classes, user, currency, handleChange }: Partial<ProfileProps>) {
    return (
        <Card className={classes.root} elevation={5}>
            <CardHeader
                avatar={
                    <Avatar src="" />
                }
                action={
                    <IconButton aria-label="edit" className={classes.editButton}>
                        <EditSharp />
                    </IconButton>
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
                <Typography>
                    Total Number of expenses
                    <Typography component="span" color="primary" className={classes.expenseTotals}> 0</Typography>
                </Typography>
                <Typography>
                    Total Expenditure
                    <Typography component="span" color="primary" className={classes.expenseTotals}> 0.0</Typography>
                </Typography>
            </CardContent>
            <SettingsCard
                classes={classes}
                currency={currency}
                handleChange={handleChange}
            />
        </Card>
    )
}

function SettingsCard({ classes, currency, handleChange }: Partial<ProfileProps>) {
    return (
        <CardContent className={classes.cardContent}>
            <>
                <Typography>Select Currency</Typography>
                <TextField
                    id="category"
                    variant="standard"
                    className={classes.textField}
                    value={currency}
                    select
                    onChange={handleChange}
                >
                    {
                        currencies.map((curr) => (
                            <MenuItem
                                key={curr?.label}
                                value={curr?.label}>
                                {curr?.value}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </>
        </CardContent>
    )
}

export default Profile;