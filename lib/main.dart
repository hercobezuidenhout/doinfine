import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';
import 'features/auth/presentation/providers/auth_provider.dart';
import 'features/auth/presentation/widgets/auth_wrapper.dart';
import 'features/profile/data/repositories/firebase_user_repository.dart';
import 'features/profile/presentation/providers/profile_provider.dart';
import 'features/menu/presentation/screens/menu_screen.dart';
import 'features/posts/presentation/screens/create_post_screen.dart';
import 'features/posts/domain/models/post.dart';
import 'features/posts/domain/repositories/post_repository.dart';
import 'features/profile/domain/repositories/user_repository.dart';
import 'core/providers/analytics_provider.dart';
import 'core/providers/crashlytics_provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final userRepository = FirebaseUserRepository();

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthProvider(
            userRepository: userRepository,
          ),
        ),
        ChangeNotifierProvider(
          create: (_) => ProfileProvider(userRepository),
        ),
        ChangeNotifierProvider(
          create: (_) => AnalyticsProvider(),
        ),
        ChangeNotifierProvider(
          create: (_) => CrashlyticsProvider()..initialize(),
        ),
      ],
      child: MaterialApp(
        title: 'Doinfine',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const AuthWrapper(
          child: HomePage(),
        ),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _postRepository = PostRepository();
  final _userRepository = FirebaseUserRepository();

  @override
  void initState() {
    super.initState();
    _logScreenView();
  }

  Future<void> _logScreenView() async {
    await context.read<AnalyticsProvider>().logScreenView(
          screenName: 'HomePage',
        );
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = context.watch<AuthProvider>().user;
    if (currentUser == null) return const SizedBox.shrink();

    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        title: const Text(
          'Doinfine',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const MenuScreen(),
                ),
              );
            },
          ),
        ],
      ),
      body: StreamBuilder<List<Post>>(
        stream: _postRepository.getRelatedPosts(currentUser.uid),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final posts = snapshot.data!;
          if (posts.isEmpty) {
            return const Center(
              child: Text('No posts yet. Create one to get started!'),
            );
          }

          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (context, index) {
              final post = posts[index];
              return FutureBuilder(
                future: Future.wait([
                  _userRepository.getUser(post.userId),
                  _userRepository.getUser(post.metadata['issuedToId']),
                ]),
                builder: (context, snapshot) {
                  if (!snapshot.hasData) {
                    return const ListTile(
                      title: Text('Loading...'),
                    );
                  }

                  final [author, finedUser] = snapshot.data!;
                  return ListTile(
                    title: Text(post.description),
                    subtitle: Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(
                        '${author?.fullName ?? 'Unknown'} fined ${finedUser?.fullName ?? 'Unknown'}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const CreatePostScreen(),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
