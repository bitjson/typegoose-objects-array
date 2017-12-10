console.log(
  'Trying to save a User with a property containing an array of objects.'
)
import * as mongoose from 'mongoose'
import { arrayProp, prop, Typegoose } from 'typegoose'

mongoose.connect('mongodb://localhost:27017/typegoosebug')

class Inventory extends Typegoose {
  @prop() public id: string
}

class User extends Typegoose {
  @prop() name?: string
  @arrayProp({ items: Inventory })
  public inventory?: Inventory[]
}

const UserModel = new User().getModelForClass(User, {
  existingMongoose: mongoose
})

console.log('Setup complete.')
;(async () => {
  const u = new UserModel({
    name: 'Gimli',
    inventory: [{ id: 'one' }, { id: 'two' }, { id: 'axe' }]
  })
  await u.save()
  const user = await UserModel.findOne()
  console.log(user)
})()
