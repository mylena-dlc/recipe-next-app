interface CategoryType {
    id: string;
    nameCategory: string;
}

interface IngredientType {
    id: string;
    nameIngredient: string;
}

interface RecipeIngredientType {
    id: string;
    quantity: Number;
    unity: string;
    ingredient: IngredientType; 
}

interface ToolType {
    id: string;
    nameTool: string;
}

interface RecipeToolType {
    id: string;
    quantity: Number;
    tool: ToolType; 
}

interface Recipe {
    id: string;
    nameRecipe: string;
    image: string;
    createdAt: Date;
    preparationTime: Number;
    instructions: string;
    difficulty: number;
    category: CategoryType;
    tools: RecipeToolType[]
    ingredients: RecipeIngredientType[]
}