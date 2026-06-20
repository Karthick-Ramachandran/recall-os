#!/usr/bin/env node
import { main } from "./cli/main.js";

process.exitCode = await main();
