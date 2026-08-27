import { cache } from 'react';
import connectDB from './db';
import News from '../models/News';
import Notices from '../models/Notices';
import Trainers from '../models/Trainers';
import Testimonial from '../models/Testimonial';
import VisitorLog from '../models/VisitorLog';

function serialize(doc) {
  return doc ? JSON.parse(JSON.stringify(doc)) : doc;
}

export const getNewsPost = cache(async (id) => {
  await connectDB();
  const post = await News.findById(id).lean().catch(() => null);
  return serialize(post);
});

export const getAllNews = cache(async () => {
  await connectDB();
  const posts = await News.find().sort({ date: -1 }).lean();
  return serialize(posts);
});

export const getNotice = cache(async (id) => {
  await connectDB();
  const notice = await Notices.findById(id).lean().catch(() => null);
  return serialize(notice);
});

export const getAllNotices = cache(async () => {
  await connectDB();
  const notices = await Notices.find().sort({ date: -1 }).lean();
  return serialize(notices);
});

export const getTrainerBySlug = cache(async (shortName) => {
  await connectDB();
  const trainer = await Trainers.findOne({ short_name: shortName }).lean().catch(() => null);
  return serialize(trainer);
});

export const getAllTrainerSlugs = cache(async () => {
  await connectDB();
  const trainers = await Trainers.find({ short_name: { $exists: true, $ne: '' } })
    .select('short_name date')
    .lean();
  return serialize(trainers);
});

export const getAllTrainers = cache(async () => {
  await connectDB();
  const trainers = await Trainers.find({}).limit(200).lean();
  return serialize(trainers);
});

export const getAllTestimonials = cache(async () => {
  await connectDB();
  const testimonials = await Testimonial.find({}).limit(200).lean();
  return serialize(testimonials);
});

export const getVisitorSummary = cache(async () => {
  await connectDB();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const [today, total, online] = await Promise.all([
    VisitorLog.countDocuments({ createdAt: { $gte: startOfToday } }),
    VisitorLog.countDocuments(),
    VisitorLog.countDocuments({ createdAt: { $gte: fiveMinutesAgo } }),
  ]);

  return { today, total, online: Math.max(1, online) };
});
