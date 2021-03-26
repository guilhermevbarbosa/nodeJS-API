import User from "../../User";

export default {
  convert(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      account_type: user.account_type,
    };
  },
};
