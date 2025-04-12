import { prisma } from "@/db/client";
import { faker } from '@faker-js/faker';

export async function createBulkPosts(howMany: number) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      take: howMany,
    });

    const posts: { content: string; imageUrl: string; authorId: string }[] = [];
    
    for (const user of users) {
      const numberOfPosts = Math.floor(Math.random() * (howMany / users.length)) + 1;
      
      for (let i = 0; i < numberOfPosts; i++) {
        // Generate realistic post content
        const contentType = Math.floor(Math.random() * 5);
        let content = '';
        
        switch (contentType) {
          case 0:
            content = faker.lorem.paragraph();
            break;
          case 1:
            content = `Just visited ${faker.location.city()}! ${faker.lorem.sentence()}`;
            break;
          case 2:
            content = `${faker.hacker.phrase()} #coding #tech`;
            break;
          case 3:
            content = `Today I learned: ${faker.lorem.sentence()}`;
            break;
          case 4:
            content = `${faker.person.firstName()} and I ${faker.word.verb()} at ${faker.company.name()} today. ${faker.lorem.sentence()}`;
            break;
        }
        
        // Use faker for image URLs or keep using picsum with consistent width
        const imageUrl = Math.random() > 0.3 
          ? faker.image.url({ width: 600, height: 700 }) 
          : `https://picsum.photos/seed/${user.id}-${i}/600/700`;
        
        posts.push({
          content,
          imageUrl,
          authorId: user.id,
        });
      }
    }
    
    const createdPosts = await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
    
    console.log(`Created ${createdPosts.count} posts`);
    return createdPosts;
  } catch (error) {
    console.error("Error creating bulk posts:", error);
    throw error;
  }
}

export async function createBulkLikes(howMany: number) {
  try {
    // Get all users and posts
    const users = await prisma.user.findMany({
      select: { id: true },
    });
    
    const posts = await prisma.post.findMany({
      select: { id: true, authorId: true },
    });
    
    if (users.length === 0 || posts.length === 0) {
      console.log("No users or posts found to create likes");
      return { count: 0 };
    }
    
    // Create more realistic like patterns
    const likes: { userId: string; postId: string }[] = [];
    
    // Give more popular posts more likes
    const popularPosts = faker.helpers.arrayElements(posts, Math.ceil(posts.length * 0.2));
    const regularPosts = posts.filter(post => !popularPosts.some(p => p.id === post.id));
    
    // Popular posts get more likes
    for (const post of popularPosts) {
      const likeCount = faker.number.int({ min: 5, max: Math.min(20, users.length) });
      const randomUsers = faker.helpers.arrayElements(users, likeCount);
      
      for (const user of randomUsers) {
        // Avoid self-likes sometimes
        if (user.id !== post.authorId || Math.random() > 0.7) {
          likes.push({
            userId: user.id,
            postId: post.id,
          });
        }
      }
    }
    
    // Regular posts get fewer likes
    for (const post of regularPosts) {
      const likeCount = faker.number.int({ min: 0, max: 5 });
      const randomUsers = faker.helpers.arrayElements(users, likeCount);
      
      for (const user of randomUsers) {
        if (user.id !== post.authorId || Math.random() > 0.7) {
          likes.push({
            userId: user.id,
            postId: post.id,
          });
        }
      }
    }
    
    // Add some extra random likes to reach the target number
    while (likes.length < howMany) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      
      likes.push({
        userId: randomUser.id,
        postId: randomPost.id,
      });
    }
    
    // Create likes in bulk (up to the requested number)
    const createdLikes = await prisma.like.createMany({
      data: likes.slice(0, howMany),
      skipDuplicates: true,
    });
    
    console.log(`Created ${createdLikes.count} likes`);
    return createdLikes;
  } catch (error) {
    console.error("Error creating bulk likes:", error);
    throw error;
  }
}

export async function createBulkFollows(howMany: number) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true },
    });
    
    if (users.length < 2) {
      console.log("Not enough users to create follows");
      return { count: 0 };
    }
    
    // Create more realistic follow patterns
    const follows: { followerId: string; followingId: string }[] = [];
    
    // Create some "influencers" who get followed a lot
    const influencers = faker.helpers.arrayElements(users, Math.ceil(users.length * 0.1));
    
    // Most users follow most influencers
    for (const user of users) {
      for (const influencer of influencers) {
        // Don't follow yourself
        if (user.id !== influencer.id && Math.random() > 0.2) {
          follows.push({
            followerId: user.id,
            followingId: influencer.id,
          });
        }
      }
    }
    
    // Create some random follows between regular users
    while (follows.length < howMany) {
      let followerIndex = Math.floor(Math.random() * users.length);
      let followingIndex;
      
      do {
        followingIndex = Math.floor(Math.random() * users.length);
      } while (followingIndex === followerIndex);
      
      follows.push({
        followerId: users[followerIndex].id,
        followingId: users[followingIndex].id,
      });
    }
    
    // Create follows in bulk (up to the requested number)
    const createdFollows = await prisma.follow.createMany({
      data: follows.slice(0, howMany),
      skipDuplicates: true,
    });
    
    console.log(`Created ${createdFollows.count} follows`);
    return createdFollows;
  } catch (error) {
    console.error("Error creating bulk follows:", error);
    throw error;
  }
}

// Add a convenient function to run all generators at once
export async function generateAllTestData(options = {
  posts: 100,
  likes: 500,
  follows: 200
}) {
  console.log('Starting test data generation...');
  await createBulkPosts(options.posts);
  await createBulkLikes(options.likes);
  await createBulkFollows(options.follows);
  console.log('Test data generation complete!');
}

// Uncomment to run when file is executed directly
generateAllTestData();
