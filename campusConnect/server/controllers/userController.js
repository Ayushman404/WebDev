const User = require('../models/user.models.js');

exports.getUserById = async(req, res)=>{
    const userId = req.params.userId;
    await User.findOne({_id: userId}).then(
        (user)=>{
            if(!user) return res.json({err: "User Not found"});

            res.status(200).json({
                name: user.name,
                bio : user.bio || "User dont have a Bio"
            });
        }
    ).catch((err)=>{
        return res.status(404).json({msg: "Can't get the User"})
    })
}

exports.updateUserById = async (req, res)=>{
    
  try {

    const name = req.body.name;
    const bio = req.body.bio;
    const updatedDoc = await User.findOneAndUpdate(

      { _id: req.params.userId },
      { $set: {name, bio} }, 
      { new: true }
    );

    if (!updatedDoc) {
      console.log("Document not found");
      return;
    }
    res.json({msg: "Document Updated"});
    console.log("Document updated successfully:", updatedDoc);
    return;
  } catch (error) {
    res.json({msg: "Error updating document"});
    console.error("Error updating document:", error);
    return;
  }

}
