exports.saveGroup = async (group) => {
  return await group.save();
};

exports.saveUserGroup = async (userGroup) => {
  return await userGroup.save();
};

exports.getAllMember = async (group) => {
  return await group.getAllMember();
};

exports.deleteUserGroup = async (group) => {
  return await group.deleteUserGroup();
};

exports.updateGroup = async (group) => {
  return await group.updateGroup();
};

exports.deleteGroup = async (group) => {
  return await group.deleteGroup();
};
