"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import bcrypt from 'bcryptjs';

type StateType = {
    accounts: Account[];
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
};

const reducer = (state: StateType, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGNUP":
            return { ...state, accounts: [...state.accounts, payload] };

        case "LOGIN":
            if (payload) {
                const updatedAccounts = state.accounts.map((account) => {
                    return account.email === payload?.email && bcrypt.compareSync(payload?.password, account.password)
                        ? { ...account, active: true }
                        : { ...account, active: false };
                }
                );
                return { ...state, accounts: updatedAccounts };
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
                return { ...state, accounts: updatedAccounts };
            }
            return state;
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
