import { currentUserService } from "../../services/current-user-service";
import { profileService } from "../../services/profile-service";

export async function GET() {
    const { getCurrentUser } = currentUserService();

    const user = await getCurrentUser();

    return new Response(JSON.stringify(user));
}

export async function PUT(request: Request) {
    const { getCurrentUser } = currentUserService();
    const { updateProfile } = profileService();

    const user = await getCurrentUser();
    const { name, aboutMe } = await request.json();

    await updateProfile({
        id: user?.id,
        name,
        aboutMe,
    });

    return new Response();
}