/**
 * Get the correct asset URL with base path
 * This ensures images work correctly with subdirectory deployment
 */
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // import.meta.env.BASE_URL includes the trailing slash
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

/**
 * Common image paths for easy reuse
 */
export const IMAGES = {
  // Profile images
  profile: '/profile-purple.jpg',
  
  // Hobby images  
  marathon: '/marathon-race.jpg',
  adventure: '/lakeside-adventure.jpg',
  gym: '/gym-training.jpg',
  transformation: '/gym-transformation.jpg',
  
  // Project images
  proj1: '/proj1.jpg',
  proj2: '/proj2.jpg', 
  proj3: '/proj3.jpg',
  proj4: '/proj4.jpg',
  proj5: '/proj5.jpg',
  
  // Blog images
  blog1: '/blog1.jpg',
  blog2: '/blog2.jpg',
  blog3: '/blog3.jpg',
  blog4: '/blog4.jpg',
} as const;
