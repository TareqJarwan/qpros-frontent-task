"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import bcrypt from 'bcryptjs';

type StateType = {
    accounts: Account[];
    error: string;
}

type Account = {
    email: string,
    password: string,
    avatar: string,
    birthdate: string,
    active: boolean,
    subscribeToNewsletter: boolean,
};

const initialState: StateType = {
    accounts: [],
    error: ''
};

const reducer = (state: StateType, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case "SIGNUP":
            const existUser = state.accounts.find(account => account.email === payload.email);

            if (existUser) {
                return { ...state, error: 'Email is Already Exist!' }
            }

            return { ...state, accounts: [...state.accounts, payload], error: '' };

        case "LOGIN":
            if (payload) {
                const existUser = state.accounts.find(account => account.email === payload.email);

                if (!existUser) {
                    return { ...state, error: 'Invalid Credentials!' }
                }

                if (!bcrypt.compareSync(payload?.password, existUser.password)) {
                    return { ...state, error: 'Invalid Credentials!' }
                }

                const updatedAccounts = state.accounts.map((account) => account.email === payload?.email
                    ? { ...account, active: true }
                    : { ...account, active: false }
                );

                return { ...state, accounts: updatedAccounts, error: '' };
            }
            return state;

        case "DELETE":
            if (action.payload) {
                const updatedAccounts = state.accounts.filter(
                    account => account.email !== action.payload!.email
                );

                return {
                    ...state,
                    accounts: updatedAccounts,
                    error: ''
                };
            }
            return state;

        case "LOGOUT":
            if (payload) {
                const updatedAccounts = state.accounts.map((account) =>
                    account.email === payload?.email
                        ? { ...account, active: false }
                        : account
                );

                return { ...state, accounts: updatedAccounts, error: '' };
            }
            return state;

        case "SET_ERROR":
            return { ...state, error: action.payload };


        case "CLEAR_ERROR":
            return { ...state, error: '' };

        default:
            return state;
    }
};

export const AccountContext = createContext<{
    state: StateType;
    dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const AccountContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AccountContext.Provider value={{ state, dispatch }}>
            {children}
        </AccountContext.Provider>
    );
};
