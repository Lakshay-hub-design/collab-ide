import mongoose, { Schema, Document, Model } from "mongoose"
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  username: string
  email: string
  password: string

  comparePassword(
    password: string,
  ): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function(this: IUser){
    if(!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 10)

    return
})

userSchema.methods.comparePassword = async function (this: IUser, password: string){
    return bcrypt.compare(password, this.password)
}


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User