import { prisma } from "@/db/client";

export async function createBulkPosts(howMany: number) {
try{
    const users = await prisma.user.findMany({
        select: {
            id: true,
        },
        take: howMany,
    });
    const posts: { content: string; imageUrl: string; authorId: string }[] = [];
    for (const user of users) {
        const numberOfPosts = Math.floor(Math.random() * (howMany / users.length)) + 1;
        for (let i = 0; i < numberOfPosts; i++) {
            posts.push({
                content: `This is a post by user ${user.id}`,
                imageUrl: `https://picsum.photos/seed/${user.id}/${100 + i}/100`,
                authorId: user.id,
            });
        }
    }
    const createdPosts = await prisma.post.createMany({
        data: posts,
        skipDuplicates: true, // Skip duplicates if any
    });
    console.log(`Created ${createdPosts.count} posts`);
    return createdPosts;
}
catch (error) {
  console.error("Error creating bulk posts:", error);
  throw error;
}
}


export async function createBulkLikes(howMany: number) {
    try {
        // Get all users and posts to create random likes
        const users = await prisma.user.findMany({
            select: { id: true },
        });
    
        const posts = await prisma.post.findMany({
      select: { id: true },
    });
    
    if (users.length === 0 || posts.length === 0) {
      console.log("No users or posts found to create likes");
      return { count: 0 };
    }
    
    // Create random likes
    const likes: { userId: string; postId: string }[] = [];
    
    // Generate random likes - each user likes random posts
    for (let i = 0; i < howMany; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      
      likes.push({
        userId: randomUser.id,
        postId: randomPost.id,
      });
    }
    
    // Create likes in bulk
    const createdLikes = await prisma.like.createMany({
      data: likes,
      skipDuplicates: true, // Skip duplicates to avoid unique constraint violations
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
    // Get all users to create random follow relationships
    const users = await prisma.user.findMany({
      select: { id: true },
    });
    
    if (users.length < 2) {
      console.log("Not enough users to create follows");
      return { count: 0 };
    }
    
    // Create random follow relationships
    const follows: { followerId: string; followingId: string }[] = [];
    
    // Generate random follows - users follow other random users
    for (let i = 0; i < howMany; i++) {
      // Get two different random users
      let followerIndex = Math.floor(Math.random() * users.length);
      let followingIndex;
      
      do {
        followingIndex = Math.floor(Math.random() * users.length);
      } while (followingIndex === followerIndex); // Make sure users don't follow themselves
      
      follows.push({
        followerId: users[followerIndex].id,
        followingId: users[followingIndex].id,
      });
    }
    
    // Create follows in bulk
    const createdFollows = await prisma.follow.createMany({
      data: follows,
      skipDuplicates: true, // Skip duplicates to avoid unique constraint violations
    });
    
    console.log(`Created ${createdFollows.count} follows`);
    return createdFollows;
  } catch (error) {
    console.error("Error creating bulk follows:", error);
    throw error;
}
}

// createBulkPosts(100)
// createBulkLikes(10000)
// createBulkFollows(1000)
