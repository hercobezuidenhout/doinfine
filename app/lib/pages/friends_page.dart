import 'package:doinfine/pages/add_friend_page.dart';
import 'package:flutter/material.dart';

class FriendsPage extends StatefulWidget {
  const FriendsPage({super.key});

  @override
  State<FriendsPage> createState() => _FriendsPageState();
}

class _FriendsPageState extends State<FriendsPage> {
  final String defaultAvatar = 'https://api.dicebear.com/9.x/thumbs/png';
  final TextEditingController _searchController = TextEditingController();
  final List<String> _allFriends = [
    'Steve Pickleberry',
    'John Doe',
    'Jane Smith',
    'Emily Johnson',
    'Michael Brown',
    'Chris Evans',
    'Robert Downey',
    'Scarlett Johansson',
    'Tom Holland',
    'Natalie Portman',
  ];

  List<String> _filteredFriends = [];

  @override
  void initState() {
    super.initState();

    _filteredFriends = _allFriends;
    _searchController.addListener(_filterFriends);
  }

  void _filterFriends() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      _filteredFriends = _allFriends
          .where((friend) => friend.toLowerCase().contains(query))
          .toList();
    });
  }

  @override
  void dispose() {
    _searchController.removeListener(_filterFriends);
    _searchController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Theme.of(context).colorScheme.onPrimary,
        title: Text('Friends'),
        actions: [
          IconButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const AddFriendPage()));
              },
              icon: Icon(Icons.person_add))
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
                filled: true,
                hintText: 'Search...',
              ),
            ),
            SizedBox(
              height: 16,
            ),
            Expanded(
              child: AnimatedSwitcher(
                duration: Duration(milliseconds: 300),
                child: _filteredFriends.isEmpty
                    ? Center(
                        key: ValueKey('empty'),
                        child: Text('No friends found'),
                      )
                    : ListView.builder(
                        key: ValueKey(
                          _filteredFriends.length,
                        ),
                        itemCount: _filteredFriends.length,
                        itemBuilder: (context, index) {
                          return AnimatedContainer(
                            duration: Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                            margin: EdgeInsets.symmetric(vertical: 5),
                            child: Card(
                              key: ValueKey(
                                _filteredFriends[index],
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.amber,
                                  child: ClipOval(
                                    child: Image.network(
                                      defaultAvatar,
                                      fit: BoxFit.cover,
                                      width: 50,
                                      height: 50,
                                    ),
                                  ),
                                ),
                                title: Text(_filteredFriends[index]),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
