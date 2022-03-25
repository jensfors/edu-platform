import { writable } from "svelte/store";
import { browser } from "$app/env";
import { supabase } from "$lib/db/supabaseClient";

const storedUser = JSON.parse(browser && localStorage.getItem("authUser")) || null

export const authUser = writable(browser && storedUser);
authUser.subscribe(
    (val) => browser && (localStorage.user = JSON.stringify(val))
);