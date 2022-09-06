import UserModel from '../Model/userModel.js';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken'


// get a user
export const getUser = async (req, res) => {

  try {
    const user = await UserModel.findById(req.params.id);
    if(user) {
        const {password, ...userData} = user.toObject();
        res.status(200).json(userData);
    }
    else {res.status(404).json({message: "User not found"})}
  } catch (error) {
    res.status(500).send(error);
  }
}

// get all users 
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...allUser } = user._doc
      return allUser
    });
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json(error.message);
  }
}



// update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const {_id, currentUserAdminStatus, password} = req.body;

    if (id===_id || currentUserAdminStatus) {
      try {
        const users = await UserModel.findById(id);
       
        if(password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        }
        if(users) {
            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
            const token = jwt.sign(
              {email: user.email, id:user._id},
              process.env.JWT_SECRET, {expiresIn: '12h'}
            )
            res.status(200).json({user, token});
        }
        else {res.status(404).json({message: "User not found"})}
      } catch (error) {
        res.status(500).json(error.message);
      }
    }
    else{
        res.status(401).json({message: "Unauthorized"})
    }
}

// Delete a user
export const deleteUser = async(req, res)=>{
  const id = req.params.id;
    const {_id, currentUserAdminStatus} = req.body;
    if (id===_id || currentUserAdminStatus) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
      } catch (error) {
        res.status(500).json(error.message);
      }
    }else{
      res.status(401).json({message: "Unauthorized"})
    }
}


// Follow a user
export const followUser = async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;
    if (_id===id) {
      res.status(403).join({message: "You can't follow yourself"});
    }
    else{
      try {
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(_id);
          if(!followUser.follower.includes(_id)){
            await followUser.updateOne({$push: {follower: _id}});
            await followingUser.updateOne({$push: {following: id}});
            res.status(200).json({message: "User followed successfully"});
          }
          else{
            res.status(403).json({message: "You already follow this user"});
          }
      } catch (error) {
        res.status(500).json(error.message);
      }
    }
}

// unFollow a user
export const unFollowUser = async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;
    if (id===_id) {
      res.status(403).join({message: "You can't follow yourself"});
    }
    else{
      try {
          const followUser = await UserModel.findById(id);
          const followingUser = await UserModel.findById(_id);
          if(followUser.follower.includes(_id)){
              await followUser.updateOne({$pull: {follower: _id}});
              await followingUser.updateOne({$pull: {following: id}});
              res.status(200).json({message: "User unfollowed successfully"});
          }
          else{
            res.status(403).json({message: "You are not follow this user"});
          }
      } catch (error) {
        res.status(500).json(error.message);
      }
    }
}