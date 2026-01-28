import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ListAccountItem {
    id: number,
    name: string,
    account_balance: number
}

export interface SelectCategoryItem {
    id: number,
    name: string
}

export interface SelectAppUserAccountItem {
    id: number,
    name: string
}

export interface SelectPeriodicExpenseItem {
    id: number,
    name: string,
    amount: number,
    appuseraccount_id: number,
    categoryexpense_id: number,
    excludefrom_savingsgoal: boolean,
    notes: string
}

export interface TableRowItem {
    id: number,
    concept: string,
    record_date: string,
    amount: number,
    name: string,
    notes: string,
    categoryname: string
}

export interface NumberRange {
    min: number,
    max: number
}

export interface DateRange {
    min: Date,
    max: Date
}

export interface FiltersFields {
    concept: string,
    categoryrecord_id: string,
    appuseraccount_id: string,
    min: string,
    max: string,
    date_begin: string,
    date_end: string
}

export interface FormIncomeRecord {
    '_method': string,
    'input-concept': string,
    'input-date': string,
    'input-amount': number,
    'checkbox-excludefrom_savingsgoal': boolean,
    'input-notes': string,
    'select-categoryincome_id': string,
    'select-periodicincome_id': string,
    'select-appuseraccount_id': string
}

export interface TableRowPeriodicIncome {
    'id': number,
    'concept': string,
    'date_begin': string,
    'date_end': string,
    'income_frequency': string,
    'amount': number,
    'excludefrom_savingsgoal': boolean,
    'notes': string,
    'category_name': category_name,

}

export interface FormPeriodicIncomeRecord {
    '_method': string,
    'input-concept': string,
    'date-date_begin': string,
    'date-date_end': string | null,
    'input-income_frequency': string,
    'input-amount': number,
    'checkbox-excludefrom_savingsgoal': boolean,
    'input-notes': string,
    'select-categoryincome_id': string,
    'select-appuseraccount_id': string
}

export interface NextPeriodRecord {
    'periodicrecord_id': string,
    'concept': string,
    'amount': number,
    'accountname': string,
    'date': string
}