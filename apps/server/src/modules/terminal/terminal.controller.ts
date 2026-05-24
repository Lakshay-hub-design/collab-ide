import { Request, Response } from "express"
import { runCodeService } from "./terminal.service"

export const runCode = async (req: Request, res: Response) => {
    try {
        const {code, language} = req.body
        const output = await runCodeService({code, language})

        res.status(200).json({
            success: true,
            output
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Execution failed"
        })
    }
}