import 'package:flutter/material.dart';

class PostPage extends StatefulWidget {
  const PostPage({super.key});

  @override
  State<PostPage> createState() => _PostPageState();
}

class _PostPageState extends State<PostPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          centerTitle: false,
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          title: const Text(
            'Post a fine',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            Navigator.of(context).pop();
          },
          label: Text('Post'),
          icon: Icon(Icons.post_add),
        ),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: ListView(
            children: [
              DropdownMenu(
                enableSearch: true,
                width: double.infinity,
                onSelected: (menuItem) {
                  print(menuItem);
                },
                label: Text('Who'),
                helperText: 'Who do you want to fine?',
                enableFilter: true,
                dropdownMenuEntries: [
                  DropdownMenuEntry(value: "leo", label: "Leo Whitman"),
                  DropdownMenuEntry(value: "ivy", label: "Ivy Caldwell"),
                  DropdownMenuEntry(value: "zane", label: "Zane Holloway"),
                  DropdownMenuEntry(value: "mia", label: "Mia Kensington"),
                ],
                requestFocusOnTap: true,
              ),
              SizedBox(
                height: 20,
              ),
              const TextField(
                minLines: 5,
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: 'What',
                  helperText: 'What did they do?',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
