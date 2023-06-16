exports.saveGroup = async (group) => {
  return await group.save();
};

exports.saveUserGroup = async (userGroup) => {
  return await userGroup.save();
};

exports.getAllMember = async (group) => {
  return await group.getAllMember();
};
