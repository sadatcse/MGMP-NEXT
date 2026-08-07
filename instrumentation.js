export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const sharp = (await import('sharp')).default;
    // Cap libvips' per-image thread pool. Left at its default, sharp can
    // spawn up to (CPU cores) threads per image and process several images
    // in parallel, multiplying into dozens of OS threads under concurrent
    // uploads/next-image-optimization requests — each of which counts
    // against the host's max-process/NPROC limit.
    sharp.concurrency(1);
  }
}
