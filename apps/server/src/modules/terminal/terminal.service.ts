import path from "path"
import fs from "fs/promises"

import { exec } from "child_process"  

import { promisify } from "util"

const execAsync = promisify(exec)

type Props = {
    code: string
    language: string
}

export const runCodeService = async ({ code, language }: Props) => {
    if(language !== "javascript" && language !== "typescript" ){
        throw new Error("Only JS/TS supported currently")
    }

    const fileName = `temp-${Date.now()}.js`

    const filePath = path.join(process.cwd(), "src/temp", fileName)

    await fs.writeFile(filePath, code)

    try {
        const { stdout, stderr } = await execAsync(`node ${filePath}`)

        if(stderr){
            return stderr
        }

        return stdout || "No output"
    } finally{
        await fs.unlink(filePath);
    }
}