import bcrypt from "bcryptjs"


export const hashPassword = async(password) => {
    const saltValue = await bcrypt.genSalt(12)

    const hashedPassword = await bcrypt.hash(password,saltValue)

    return hashedPassword
}

export const comparePassword = async(enteredPassword,storedPassword) => {

    return await bcrypt.compare(enteredPassword,storedPassword)
    
}