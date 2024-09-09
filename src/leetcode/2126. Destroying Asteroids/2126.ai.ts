export default function asteroidsDestroyed(
  mass: number,
  asteroids: number[]
): boolean {
  // Sort the asteroids in ascending order
  asteroids.sort((a, b) => a - b);

  // Iterate over the sorted array of asteroids
  for (let asteroid of asteroids) {
    // Check if the planet's mass is greater than or equal to the asteroid's mass
    if (mass >= asteroid) {
      // The planet absorbs the asteroid, and its mass increases
      mass += asteroid;
    } else {
      // If the planet's mass is less, it cannot destroy the asteroid
      return false;
    }
  }

  // If all asteroids are destroyed, return true
  return true;
}
