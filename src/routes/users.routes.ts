import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();
  const user = await userService.execute({ email, name, password });

  delete user.password;

  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarSerice = new UpdateUserAvatarService();

    const user = await updateAvatarSerice.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);
export default userRouter;
