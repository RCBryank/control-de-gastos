import AppTopbar from "@/components/app-topbar";
import MenuItemTopbar from "@/components/ui/menuitem-topbar";
import { ReactNode, useEffect } from "react";

export default function WebAppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="bg-brand-background min-h-screen">
                <AppTopbar>
                    <MenuItemTopbar selected={window.location.pathname == '/dashboard'} href="/dashboard">Dashboard</MenuItemTopbar>
                    <MenuItemTopbar selected={window.location.pathname == '/miscuentas'} href="/miscuentas">Mis Cuentas</MenuItemTopbar>
                    <MenuItemTopbar selected={window.location.pathname == '/ingresos'} href="/ingresos">Ingresos</MenuItemTopbar>
                    <MenuItemTopbar selected={window.location.pathname == '/gastos'} href="/gastos">Gastos</MenuItemTopbar>
                    <MenuItemTopbar selected={window.location.pathname == '/reportes'} href="/reportes">Reportes</MenuItemTopbar>
                </AppTopbar>
                <div className="py-16">
                    {children}
                </div>
            </div>
        </>
    )
}