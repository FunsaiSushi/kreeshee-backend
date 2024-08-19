import UserModel from "../../models/userModels/user.model.js";

const searchUser = (req, res) => {
  const searchTerm = req.query.name;

  UserModel.find({ username: { $regex: searchTerm, $options: "i" } })
    .populate("sentFriendRequests")
    .populate("receivedFriendRequests")
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: "Internal server error" }));
};

const getUsersSuggestions = async (req, res) => {
  try {
    const query = req.query.query;
    const suggestions = await UserModel.find({
      username: { $regex: query, $options: "i" },
    })
      .select("username")
      .limit(5);
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { searchUser, getUsersSuggestions };
