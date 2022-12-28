import passportLocal from 'passport-local';
import passport, { PassportStatic, use } from 'passport';
import bcrypt from 'bcrypt'
import User, { UserDocument } from './models/user';


