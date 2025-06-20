"use client";

import { redirect } from "next/navigation";
import { FE_LOGIN } from "./constant/endpoint-fe";

export default function Home() {
    redirect(FE_LOGIN);
}
