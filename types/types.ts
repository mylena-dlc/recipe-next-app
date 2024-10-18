interface CategoryType {
    id: string;
    nameCategory: string;
}

interface IngredientType {
    id: string;
    nameIngredient: string;
    image: string;
}

interface RecipeIngredientType {
    id: string;
    quantity: number;
    unity: string;
    ingredient: IngredientType;
}

interface ToolType {
    id: string;
    nameTool: string;
    image: string;
}

interface RecipeToolType {
    id: string;
    quantity: number;
    tool: ToolType;
}

interface Recipe {
    id: string;
    nameRecipe: string;
    image: string;
    createdAt: Date;
    preparationTime: number;
    instructions: string;
    difficulty: number;
    category: CategoryType;
    tools: RecipeToolType[];
    ingredients: RecipeIngredientType[];
    steps: StepType[];
    isHealthy: boolean;
    isVegan: boolean;
    comments: CommentType[];
}

interface StepType {
    id: string;
    number: number;
    text: string;
    recipeId: string;
}

interface CommentType {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

interface ArticleCommentType {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

interface TagType {
    id: string;
    name: string;
}

interface TagArticleType {
    id: string;
    tag: TagType;
}

interface ArticleWithTagsAndComments {
    id: string;
    title: string;
    text: string;
    slug: string;
    createdAt: Date;
    tags: TagArticleType[];
    comments: ArticleCommentType[];
}

interface MealPeriod {
    id: string;
    name: string;  
    mealPlans: MealPlan[]; 
}

interface MealPlanRecipe {
    id: string;
    mealPlanId: string; 
    recipeId: string;  
    mealPeriodId: string;  
    mealPlan: MealPlan;  
    recipe: Recipe;      
    mealPeriod: MealPeriod;  
}

interface MealPlan {
    id: string;
    date: Date;                
    userId: string;              
    mealPlanRecipes: MealPlanRecipe[];  
    mealPeriodId: string;   
    mealPeriod: MealPeriod;     
}