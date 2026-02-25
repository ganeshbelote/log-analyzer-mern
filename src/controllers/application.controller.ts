import asyncHandler from "../utils/asyncHandler.js"

const createApplication = asyncHandler(async (req, res) => {
    const {userId, applicationName} = req.body

    
})

const fetchApplication = asyncHandler(async () => {})

export { createApplication, fetchApplication }
