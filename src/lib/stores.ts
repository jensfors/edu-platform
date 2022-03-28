import { writable } from "svelte/store";
import { browser } from "$app/env";
import { supabase } from "$lib/db/supabaseClient";
import type { User } from "@prisma/client";

const storedUser: User = JSON.parse(browser && localStorage.getItem("authUser")) || null

export const authUser = writable(browser && storedUser);
authUser.subscribe(
    (val) => browser && (localStorage.authUser = JSON.stringify(val))
);