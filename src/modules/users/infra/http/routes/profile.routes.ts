import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthenticate);

const profileController = new ProfileController();

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
