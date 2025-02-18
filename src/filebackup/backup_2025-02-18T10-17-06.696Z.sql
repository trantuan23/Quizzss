PGDMP             
            }            quizzs     12.22 (Debian 12.22-1.pgdg120+1)    15.10 (Debian 15.10-0+deb12u1) 8               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    19143    quizzs    DATABASE     q   CREATE DATABASE quizzs WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE quizzs;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    8                        3079    21005 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    8                        0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �           1247    21017    questions_question_type_enum    TYPE     w   CREATE TYPE public.questions_question_type_enum AS ENUM (
    'multiple_choice',
    'drag_drop',
    'audio_guess'
);
 /   DROP TYPE public.questions_question_type_enum;
       public          postgres    false    8            �           1247    21024    users_role_enum    TYPE     Z   CREATE TYPE public.users_role_enum AS ENUM (
    'student',
    'teacher',
    'admin'
);
 "   DROP TYPE public.users_role_enum;
       public          postgres    false    8            �            1259    21031    answers    TABLE     E  CREATE TABLE public.answers (
    answer_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    answer_text text,
    is_correct boolean,
    reason text,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
    DROP TABLE public.answers;
       public         heap    postgres    false    2    8    8            �            1259    21040    audio_guesses    TABLE     �   CREATE TABLE public.audio_guesses (
    audio_guess_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_guess character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 !   DROP TABLE public.audio_guesses;
       public         heap    postgres    false    2    8    8            �            1259    21045    classes    TABLE     �   CREATE TABLE public.classes (
    class_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    class_name character varying(100) NOT NULL
);
    DROP TABLE public.classes;
       public         heap    postgres    false    2    8    8            �            1259    21049    drag_drop_answers    TABLE     �   CREATE TABLE public.drag_drop_answers (
    "dragDropAnswer_id" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_order json NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 %   DROP TABLE public.drag_drop_answers;
       public         heap    postgres    false    2    8    8            �            1259    21057 	   questions    TABLE     F  CREATE TABLE public.questions (
    question_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_text text NOT NULL,
    question_type public.questions_question_type_enum NOT NULL,
    media_url character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "quizzQuizzId" uuid
);
    DROP TABLE public.questions;
       public         heap    postgres    false    2    8    641    8            �            1259    21065    quizzes    TABLE     z  CREATE TABLE public.quizzes (
    quizz_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    article text,
    "time" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "subjectSubjectId" uuid,
    "resultsResultId" uuid,
    "classClassId" uuid
);
    DROP TABLE public.quizzes;
       public         heap    postgres    false    2    8    8            �            1259    21073    quizzes_classes_classes    TABLE     x   CREATE TABLE public.quizzes_classes_classes (
    "quizzesQuizzId" uuid NOT NULL,
    "classesClassId" uuid NOT NULL
);
 +   DROP TABLE public.quizzes_classes_classes;
       public         heap    postgres    false    8            �            1259    21076    results    TABLE     )  CREATE TABLE public.results (
    result_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score numeric(5,2) NOT NULL,
    completed_at timestamp without time zone DEFAULT now() NOT NULL,
    answer_ids json,
    "userUserId" uuid,
    "subjectSubjectId" uuid,
    "quizzesQuizzId" uuid
);
    DROP TABLE public.results;
       public         heap    postgres    false    2    8    8            �            1259    21084    subjects    TABLE     �   CREATE TABLE public.subjects (
    subject_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subject_name character varying(100) NOT NULL
);
    DROP TABLE public.subjects;
       public         heap    postgres    false    2    8    8            �            1259    21088    users    TABLE     �  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    role public.users_role_enum NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    refresh_token character varying,
    code_otp character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "classClassId" uuid
);
    DROP TABLE public.users;
       public         heap    postgres    false    2    8    8    644                      0    21031    answers 
   TABLE DATA           }   COPY public.answers (answer_id, answer_text, is_correct, reason, submitted_at, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    203   �N                 0    21040    audio_guesses 
   TABLE DATA           h   COPY public.audio_guesses (audio_guess_id, correct_guess, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    204   ff                 0    21045    classes 
   TABLE DATA           7   COPY public.classes (class_id, class_name) FROM stdin;
    public          postgres    false    205   �f                 0    21049    drag_drop_answers 
   TABLE DATA           q   COPY public.drag_drop_answers ("dragDropAnswer_id", correct_order, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    206   �g                 0    21057 	   questions 
   TABLE DATA           u   COPY public.questions (question_id, question_text, question_type, media_url, created_at, "quizzQuizzId") FROM stdin;
    public          postgres    false    207   h                 0    21065    quizzes 
   TABLE DATA           �   COPY public.quizzes (quizz_id, title, description, article, "time", created_at, "userUserId", "subjectSubjectId", "resultsResultId", "classClassId") FROM stdin;
    public          postgres    false    208   p                 0    21073    quizzes_classes_classes 
   TABLE DATA           U   COPY public.quizzes_classes_classes ("quizzesQuizzId", "classesClassId") FROM stdin;
    public          postgres    false    209   �x                 0    21076    results 
   TABLE DATA           �   COPY public.results (result_id, score, completed_at, answer_ids, "userUserId", "subjectSubjectId", "quizzesQuizzId") FROM stdin;
    public          postgres    false    210   �y                 0    21084    subjects 
   TABLE DATA           <   COPY public.subjects (subject_id, subject_name) FROM stdin;
    public          postgres    false    211   #|                 0    21088    users 
   TABLE DATA           �   COPY public.users (user_id, username, email, password, role, "isActive", refresh_token, code_otp, created_at, "classClassId") FROM stdin;
    public          postgres    false    212   r}       r           2606    21098 &   classes PK_1c29abc497051d41c2d6e276a05 
   CONSTRAINT     l   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "PK_1c29abc497051d41c2d6e276a05" PRIMARY KEY (class_id);
 R   ALTER TABLE ONLY public.classes DROP CONSTRAINT "PK_1c29abc497051d41c2d6e276a05";
       public            postgres    false    205            �           2606    21100 '   subjects PK_3573ed298f466a8ba663579e077 
   CONSTRAINT     o   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT "PK_3573ed298f466a8ba663579e077" PRIMARY KEY (subject_id);
 S   ALTER TABLE ONLY public.subjects DROP CONSTRAINT "PK_3573ed298f466a8ba663579e077";
       public            postgres    false    211            ~           2606    21102 &   results PK_3c8f50c2bb1131ae2acc86bb48e 
   CONSTRAINT     m   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e" PRIMARY KEY (result_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e";
       public            postgres    false    210            t           2606    21104 0   drag_drop_answers PK_6dd6fbefb8f3c518a396caba519 
   CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519" PRIMARY KEY ("dragDropAnswer_id");
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519";
       public            postgres    false    206            |           2606    21106 6   quizzes_classes_classes PK_7638b43469f8a13564d97e255f6 
   CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "PK_7638b43469f8a13564d97e255f6" PRIMARY KEY ("quizzesQuizzId", "classesClassId");
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "PK_7638b43469f8a13564d97e255f6";
       public            postgres    false    209    209            v           2606    21108 (   questions PK_8e940ecc478000e09fa8b008ec6 
   CONSTRAINT     q   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6" PRIMARY KEY (question_id);
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6";
       public            postgres    false    207            �           2606    21110 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public            postgres    false    212            x           2606    21112 &   quizzes PK_b7d4aa6b41f9d06330dcf7695e3 
   CONSTRAINT     l   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3" PRIMARY KEY (quizz_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3";
       public            postgres    false    208            n           2606    21114 &   answers PK_cb080abe9c2f19dc80f9563bf50 
   CONSTRAINT     m   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50" PRIMARY KEY (answer_id);
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50";
       public            postgres    false    203            p           2606    21116 ,   audio_guesses PK_fc2c8e780e4a2be2d3fb86a3800 
   CONSTRAINT     x   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800" PRIMARY KEY (audio_guess_id);
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800";
       public            postgres    false    204            y           1259    21117    IDX_abb25903a56d4134889d06ea01    INDEX     p   CREATE INDEX "IDX_abb25903a56d4134889d06ea01" ON public.quizzes_classes_classes USING btree ("quizzesQuizzId");
 4   DROP INDEX public."IDX_abb25903a56d4134889d06ea01";
       public            postgres    false    209            z           1259    21118    IDX_be7d41d2022b3e9af2e2813058    INDEX     p   CREATE INDEX "IDX_be7d41d2022b3e9af2e2813058" ON public.quizzes_classes_classes USING btree ("classesClassId");
 4   DROP INDEX public."IDX_be7d41d2022b3e9af2e2813058";
       public            postgres    false    209            �           2606    21119 &   answers FK_1a8f790e4bd5cad9c0c80a17141    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141";
       public          postgres    false    207    2934    203            �           2606    21124 &   results FK_1f731e01e0e2fd0a18beeb71115    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115" FOREIGN KEY ("quizzesQuizzId") REFERENCES public.quizzes(quizz_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115";
       public          postgres    false    2936    208    210            �           2606    21129 ,   audio_guesses FK_20ea6e0eaf46179e3f6d057ebca    FK CONSTRAINT     �   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca";
       public          postgres    false    204    2934    207            �           2606    21134 &   quizzes FK_238d287ac529e65d6486fdf199d    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_238d287ac529e65d6486fdf199d" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_238d287ac529e65d6486fdf199d";
       public          postgres    false    2930    208    205            �           2606    21139 0   drag_drop_answers FK_26c8ddf89c0e03b627b9d96d738    FK CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738";
       public          postgres    false    2934    206    207            �           2606    21144 &   quizzes FK_3604c816e13d771e7fa8df6e5ca    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca";
       public          postgres    false    2946    208    212            �           2606    21149 (   questions FK_8e693293995f0f807f22f86bd1c    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_8e693293995f0f807f22f86bd1c" FOREIGN KEY ("quizzQuizzId") REFERENCES public.quizzes(quizz_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "FK_8e693293995f0f807f22f86bd1c";
       public          postgres    false    207    208    2936            �           2606    21154 &   quizzes FK_9c542c3cd9489b9b0d3192f7b38    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38" FOREIGN KEY ("resultsResultId") REFERENCES public.results(result_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38";
       public          postgres    false    2942    208    210            �           2606    21159 $   users FK_aba130f16dcc9c7a5ba13712f36    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36";
       public          postgres    false    2930    212    205            �           2606    21164 6   quizzes_classes_classes FK_abb25903a56d4134889d06ea01d    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "FK_abb25903a56d4134889d06ea01d" FOREIGN KEY ("quizzesQuizzId") REFERENCES public.quizzes(quizz_id) ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "FK_abb25903a56d4134889d06ea01d";
       public          postgres    false    2936    208    209            �           2606    21169 6   quizzes_classes_classes FK_be7d41d2022b3e9af2e2813058c    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes_classes_classes
    ADD CONSTRAINT "FK_be7d41d2022b3e9af2e2813058c" FOREIGN KEY ("classesClassId") REFERENCES public.classes(class_id);
 b   ALTER TABLE ONLY public.quizzes_classes_classes DROP CONSTRAINT "FK_be7d41d2022b3e9af2e2813058c";
       public          postgres    false    205    2930    209            �           2606    21174 &   results FK_ca60ad9b3b31538111a39edb6df    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df";
       public          postgres    false    210    2946    212            �           2606    21179 &   results FK_d2c15601f86021607bc3d0bebad    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_d2c15601f86021607bc3d0bebad" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_d2c15601f86021607bc3d0bebad";
       public          postgres    false    211    210    2944            �           2606    21184 &   quizzes FK_fbd22f76b3b55959b0d074de9d4    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4";
       public          postgres    false    208    2944    211                  x��\�kdǕ~���&��~�*�>$6�.�͂�Ƀ_��U7���H��h�fXc���BL6dƃ��ƃ��2bɃf��B�K�;u[���3f�چ�Vߪ[�ԩs��Su��V$��FtLaY��3���!�,J���Q�xs�yC҇����·�ޑ\�%��jG��G^	ն�kRڵ2%Ϻ�&��.��dJg׶m�Q�-��`��L��2�g!;ǂ��ͪD�䝟��R�њf�����.���a��B�%ĴRmZ�I����~��N�M:��7wǧ�ǋ��v�f}��~����o'��&M��?�����Ǹw~~���>�5�8,����<l�O>�w�NS�h7��so^�de�]+8�\�e��K��HmJk\.�mE���2��
�G,��҄N����NB�LX+���vd����DW�r+b�r���4��Z֕A��>�-\�]W��L+g�sN�V{�u,�gC���rS�����#.[�_Ӓ[���L�4�C(�1'$�Zv��%ڢ2~0/Sa��̢�-��d!�%�hvp���΋_�>�oN���>�?��~RW{>>}��;�S3����?;l>
�h8�-vѲ{��뾉0����L�t�-��hr~�qj�վzWڝ��ɧ�&��M;h[
70�`��f�b���:��ҹ��5j��/@g�Ī��:8xjkXlCˌ����u��;o����M��ٙ
K��ZDQ������ud�JY5���1�iz����X��m�K(� ��XZ�#�H��x]W]�|�XPJ`--׺�
'�+�-[�.�v�u��k;�t�㝶΅
����
�MQJj��%� �M^
�['a~��R���6.�h��ň��E]�	���U��������1d��G^,L+R���y�F
��J8��E��zi䎔�m�Z�&�D�Na���-���.�":'�T��A1�E���b�LJ)0�i��Y��K_��]���N�w~�FjB�<�2 ��N���t�H+��J=�ME�c�]J�js��5��R�%v�<�0�<�G"Z�t�[���+`�6e����	\u :Z ��T���=0�ln2���![�#�ȃ[�"�6D]ZΒG<n]d]'�)Zp�˖N���2��!	����\<���|"�[�a>��GJׁ��heˡ�.2�}��Ж.K2��yI�E(DI�9p8��-0�N��Ace�Ր&�i	���*Ԫ����YW;��%N�����}�nD�[��������R�ti�&�&,t�����$��*X�H?R-|˼�ə��!��G	bT)�Bk��-��誡�+!*,p�x����a��ަ0��̅���H���H-�&&2��Ƴ���w����p������\�����@������mV����Sz�!�"�a�s$4�1&�R���hr9*{��ɺ�JR�b�3V��	��EFrH�s{)�0�m狑
4z+	�[�!�����`�� Ak���Ā�~�7۝�ÍeR<��̊������+��6V����[� >���~�?'������x�ʗ�{�O�~�?_4{���p+������7.��ͦ?���js��������	=� S�=�vҨ�&�C̯�ѭ*$�!oC$EV��k+��<eУ�B��d��`�.�?�q�"SJȄ�H�R��5+%��AW{�����1j����l6�	�X�����<��,K�ImY�)`����&۔	ۓ��'dpd��}��7�۔'#w/�sY"4:� G���Z%E+���&z����&%g
���X֖d���2�Bj2�q8* ɥo�fG%_��7�oW{��=C����t>���_��C�@;-��'���q�ȉ�7�`��L�| �$�B���ִ�wt�a�J)���˺
"�w��!�j�/J�)���i��D&���Ҩ�x��7J����A�ȸ�;���wِG��tlq�E����0�T�Q�\1��5�Dŋ��]�-�ůjec������K� �������_,j�����`�aN���T�zH2P���#��&Q?��M�eu��4n��	����`}<uu��E��:o�lv��=��ҝ����F`���!�"㉲Q��%ƭ@D�9�s��p�7n#ȳ�.����R�d�rID@_r���R	��>�#��˖�!n�I�qJ"�l��sc��!�^�,:��T*>$1S�mȝ���U��G��䰙�i,���6�H]����`�T5c
,%"�?���"�w���Sܵ�t������x�e�&_�*�C���&�t<�����b��������O??��u��5��OS�7!���"��A�{��I�9�~���Q�~�~��q#)X}1mbu˃��`�C��o~;�M�
<��^TR'W{�p��\��)j��`��am�Y)[�+[ovG�sB���+M�&k�9�����H�<W��Y)��%��SF'됪j�d�"+�"�c[�X� ��Z��aa:[�����>��NE��\���`���^���c��q��rc��o_���r^�ٽ��ү��ހ�����zh!��J�:K{� �8�/_Z�}����r�*���C
d��jU����p̶ѫ�C�EԨ�
�~��X�pQ"SoC����?m��	�����l}
�����V�.�ڄ�IX��6�)UR�N�`�f 9ONiľ ����jA��<�(��Q�`S���&�r�����<�+�����;���{�d�sO����b��%� �z�ڟ�f�I�8ق��{w�
`�6i��R&�:�}]$���ܦ,T1Ϻ�,e�d���!;n�"�T�q� )*��߼ѴR92���tT��kX�)�u�n5p��W���(=��F�t��T�����o5�;��]j�AB[��4�o[�BB%D�dY��S!U%��m)�V&s��&E�Z��s��RM�x�����Wn�7̀-����x["I�J�T-��0����ihd�)���~�O`?{�?��^�|�w�}fSr��Ȉ>�_͓ɕ���X����f�N�V����?���5�̪݇��x�iwt�"R���O���gȵN��}7�rN�߭�6ᚃh}E�xڏ7�{΃��&9����+5	�x�Zӟ�ז��#GJ
/n�9�M�_�%�̈+p]�D�K*�T\G)�V�%U��XMۚ�|�0!R̭�Qy3`�����_oS&	gxc��t�����jg�K�c]������S� �
��H�������U��ě��D��ea�����Q�޼���y�zi]aw>�傸U�o���TnD�P2���G� �e �Qzd���ү��۔� ��]���i>�w&SR�B�1֪U������$���yG��뚄���g)�.��	�LK�d�%▅P�4�-Q1�Yp�0�E��;�Zr��������T:�6��sX\���4�=���ԟ4i/,�x�G�7���כ�T���ʚ	k .	t�	����d=���+Hϭ�S��1��T�-�4��bY�����pi�a�mخ-ݪPAA(�%�0�v!�H�u*�l8w���g֦3�Ǆn����w�	��� ��NfqX�0I�E�pmC�R�%M�N��h�������;j���R��pZ�����q�� Y����OK�)��:��i�ܯ�8�Բg���!�]���� �t�SsI'_=R.#:/�"�z��Uf}{�t���#���h�:�;:t�C,t(Y�B�Y9�����سC ���M�+??}�j�7 U�v�|8�;��^|:;��V��h�E�j���U�Z�s�ûW���0G/�M��|���`�9��;�(�;X���q-�MO�:��x���x����л4�ā ���@����i���Z�5�P�csJ�nԼ�Ջ���=gY�Ǆ�}�ʈx�������r�ܲ"�n�:$�擪P��R�:��Q;jޢ�@���m��S�~m�c�]p(c�a�;�lr)�X���g�N�V��KSK�Ӻ�0�l,����珏�?��|�]� �  5l;P�*��:k{�xu5���Isa�����0��)i97�k��������g�7~�M-�<fZa(��@ٹg�R�!�� �ۧY�����qB+�6ͮ��R�}���V�����d��߻ ĢƩu8�EB�EFtu��`;��w��_���dE��������,�[=����l�jNW���55??���`���G�9d| �{���O=�ے;�b�-�n�h�#�\���zP3�Κ=J���R� �����N�8`��Ş-.��W��n���>k}4x��_,B3����h���G���=��2�=��j��p� �v��	dg�i5Y¿��o��/{�N��'�tA� l�}s�I}�P�ƜΞh��d3$2��fv�$m���#"�B&gW5B�I%�c�@�Y���
M jY�}r�����낿�4�=��B��~�zhh/���T����!�.�]�M����%�ܯt����^U��^_i���I�����i��3B�%�z��~������C���4m�RՄ$8����-h�zU5�O$	��(��*y���Sm]Ękj:Ŀ�
�u�/V�}�ʈ�"L��m7<lr�wC�o���i���ds06��0D,��A`��j��'�ftaL�XS��3B�~y�����Ǵ/av9.��6��;1�.�������7��p�#A�������Of�U!�G �*\^���r��$HKR���L�x����]���a�+�!mZ��K�qzO$�{ �-��Tt��I�3��w&�0�n������X��/�
ۄ�!a�8DQ9M�;���~���=��|��$�t�p��ك�r�lxm�R8�W�p�r��,F?}4Y��<W_x;��^u�z�?<�'�6�ŀ@��_O�/���3b�'��Pwǰ�Z���9�$m������u � jNoBk3H�m�!̬'���ח�B�9H'����*�z!�����Z.Pk\�����Cъ�|e�Ċi�y��#:�24�g��{�J �u
�����T��F��& ��_��a�{H\.J.	��&�R������`����2���ܥ)��=��ͳ��+/�`xPW�wW�$�~��R��HM+�y�Z�(W��`L?����9U��)tN&����ϧK�]T����R�4���R;`�L׉r��u�&��(	�p�|����HqL��=��
��ky�|�8��5Etz�ten�%J��9�.�e:F:?�Z��!�(��E��s���n���(B
r&h�cz�kd�v^:]ϊ�����Kպ�cD�#=x�V�-G��B
�_�/ހ�I��׋�-˃���WJJ�8&�z\�儞R�z����C����M��d�'.�7�N����i����BuA����OF��޶<��o���d{�W^��Ӈ� �j*��8��>��`7��2����]��5\�9���PU�Ξ����J��Q?:����/�'�ߠ
z���������(�C2ɑ[iz�����ʴ.K�K�r��dG�&i�93��E��	��'���,+U9~�/��B5�<U����u��;�j��s�����Zg���r���b����m',�(G�%�Z¥��Dd6s8�ߧd��� ��b@���GU�LT'������告��@�t�SM܅��"2-h�G|��B���\E�Յ-��\r~QI�\J,�����y���/��iF-���N�a��y��I��߶���%����Qp~F	Y�R-�o-9&�2�:�L����p5�B ���)Y�,i��ӋC�>�-�ͱpgU��v+�U�r�3�*b���MJ^�LܜB�|5z\s���|��;�/��^ݠ���������^����&FǘXhu�DҾ�Zd�11�H�
��˪���a���m�HZ���5��qq���9�zD�T_���	VTn�pt�#�3�\���Pa`^����W�I���E���|8����?���=            x������ � �         a  x�M�=�A��S���j�_�@"�1!Iٮڙ�^�v���ab�v�AܣoB-$�X�����L��WZ����������B���v�{�t���	rZ�Q��2��Rb-]�L��z�o��_���U��p1n� 밪�Ȉ�ЪO^{omz�����=�>̟߯�KM(&�#�G`�
5>�ΉC�J��u{s9����s�����)��a�⣨N�����l��� <n��������k=ԪȐ;�wH�	#4�h&J������T_k�1u���\��.	�y����\��z;��zp��;D�G�:�(����L/��{�r��Ab`+�!s������v�7���gι����            x������ � �         �  x��Wˎ�]S_Q��"�^]�����z5٘~���fe@�,�,�����a�X�h�YP��_�SM�!��d��V�9��{�*h�c)$�"dT*[PDI㙔�,�̭���0V]Kت�����~�U>���Êg\ьSfH�6��H��$�B��\
��
LO���S�4peMQ���z��ҕ�-���6�y�i53��X��#�9|�e	SE��e�g.7�Q
A���:muVF�K��*>B ��(֚��!�NuF}�Idf-r�hYr��dY%A.@�7����E�&A��C&(s�S�+Cm����9�fR���b#��І��@n�`�R���28NQ&󲈊+�U�W���U�%m�&c�����mb�Hƪ��w�05)ƶ�ě}l��*�?��Y+�d|e�3�˒4�V�B�"(���I����-��)�
d��q/V�.; �~�޸�#��2A�ف8�e�8<咽좭��^E�blɾ�bX�Al2�ε�F/�PD��jM���<����+�D�W�� P�
�&���Rw��n���ؑ��k<�]x#`w�����M9�;�[?�~8W�*��n�0ٺ>���۪��a	Q�N[��XF�e%���TZK�:���"Z[0X��\�:�{b�1�����&6n�O��W݄�q��)@zݵ��@����] Oېa_��x13��������**7Ҭ���eD]��<��Q�--2S�K�L#��0����@,��ZT`_�6���}Kj�o#i�Ět%�n[�E�R�Ʀ���/�-�\1S��f�=�k���*��ХɱJ�<8�3o�����ԎU��A�G�뚘�{tP�'�;4X��x<=����A?���q��p�7B��r͊���q9�/�q��ׅ�I8�ΒC3���wUz ���s�#,x����C�T�ގУt��\�������B�L,��<��T�Q_CP�-��!>��zcWM?�a��h~�<k)%ۣa�v8�����bn�$�6�!JcS��̰��87J��R&�ȶ�rUű���f#9���-�	����N�(�e
�n��`�UJ0���-�����3�R0N}�E��Tcꮺ�����묻4�:9�ÈK��
�c]����O.��|��12g���˄�67����,���mX�I�eJ��4�n^�<�*Ir��q�C�:�&7����}m��~�����e�]p�$�m*o�Z��c_N⺉��U��MxCYk�V\(_!�����;�m��4�Fk�	x�N�����t��=��[O����N	nG���S�����o��÷>�*b[������	�rzxm���S�ۧ-�:� �h;BIss���!�w�����b�w?�����9Nv��!mNϰl��i�����a�x��>�F��O��6�9]��A��?�.���Bv�n�5��/�sFs��R�GP�	���՞�"+��*q���sn�޵�dO	9i�y�K�'����^�@����x�'���n~!��Mu�{��6�g���<�?���'�-�?�i�'S|d�����&����m� �3�o;$��u���̪==�L��w���O<+�S���p7=��Yc�Vl�X�V�BcsL�8��*/�G�5\a�"�/��X���܅R����cU�����K���`A��}�2�y�оB���Z�s��'�4j{zxU%QW�v�
��\ӿz�6�fj�D��I�y6_�j�a}��S��?�����`��bc4s���!b	��8""�Y��X�$�	�_@t��A��z�y␆��ܤ��l�}7��K=�4�ʧ�I�X�S�Z1�_Ƣ̼c�J��6p#uNU�1�.�V�9�7ǻ����'����^�j:�A
�q�+pn��3�w�I�/m*����%�eւ�B���)�	�\�"��JG���vhZ���O���z�ޒ�/W���>�a���9���R�|q�{3i��_�~����h�!�B�}�~���� ��         ~  x��W݋���'ok���F�}0���RlJc�R�p%]�.+]��1�yK	ŔRj��R\î����N���<�A��?&I�JcϮ�@��\�{��}�s������n�����<!��8�����d�ˁt�A���IEe�^�HOc�^�O������r�zN��z�����:���t��>�Q}�)X��(�	��_/�4���x�<��\�|�%�.E���,ߣX&����(eNJ�r&�IB��ҙ�˂��}��rAeF�	��2�PE�̥.�Pe%J��¢,*��JZ%Bˬ*���I�
��d6K$��>�q�~�?�G崏��8Ϫ�Ԙ]�u��re�$?G�bNi+�*�������I��d2�Y$�Vjf������QUV�D
�J%.{�U(W�U�nKLD)F�R5�K�*��b1�&��7�y�
I�����D�S�[b�[�X��  .���Mb�� ɫ\$�(�*�*G���JB�͢��
�R�T�$iȊ�Y�0P؂����=���q}�X��@ ��.�̧c�BT%��D���ȵ,
�����H��ӿJ[G2I�}\�� �h����R��,�4�L���*�R�"XT�)���+�L�A���f{��Kv3{�007��� ��G�{�
UA;�a��$�%ق��[4e��?%Y�G��g���3���ڣ��ɴ��m����aҰ�ʦƿ�L�(e�(���L$X4d �۞�?f*Wb?V�p#?He��<Iw+��T�8�����v>�'����N�p�!7�/Y� �D�1=��ͼ,��t�/ه3nv�آ��`[���j.um��z���svϵ�1����x�������p"<��a�mO��-� ��I�r2�ǽN4�h�H�7�'�狾�ˉcO|�'zQ8�Cٹs���@��ص��qlo0pm1Ev4��p��a��C��v�"�d���B��;To���_u{�K=�\�X��6���o�3�.���:���������2������0�=�N�;�l�����9=7�\�큒�0�ra᎙�����W@�.."f�Z�g��W�^b���SX������x���ؽ������ك3��i@�����CEi�D���֫GWY	BU?�ӏ���Rdt�^�d�}
�%H��|��@�A�6j|���؎# �O_�^����}9���n��1`X`� (?�e�<��r�e0WG�r����S�e&��`�K�4��4��o����5�����K�����^�ԴW?� ����k�1��V�Mj��!L�}�>5'L,`�g��/P)m���V��2�O��a$�#Y���)�f��c�=L+�F��`��v1+��׳�|d�ES���y���}�ۥ?l�b�Ɋ��t����a�oe�kn�3犏�)r��� ���%�^�?}�517�MP�z�4�kY����Դ���G%���w���S����&���^"���&>(ɯ��A_���?���̙�a 礱�������?C��s�M� [���Q����>��o%j<f|�����$��}�n��$f~q�6B���O<���.6�¶`��%xĳ��s��D�f��E�6�(Z6ӓ{sj(��^��*ב�5�j�c���ɹMT�ރX�j��K�2�6�dF�V��T�޶�vrA����i;�]�7���{�������������~�T|��az>Uf0m�yo���PV�t�=<;�gڂMw9�������r���m��C�f�z��m��C�������=xj��	��eW{��>��cm�]�Y
�S�9u��ܗ(*��v�4�M�x���	������N͖k�R�Wmǵ��WǦ�&b<I����ޘ[����{��-x�s��)w���M���7���SD�LW69xP�|�s.��VY��l,s��:�0���Y��G���j!�u{	_���@�ߛ�f
lj����͇�5��/�f`����ť�u���ǟaе��>�A�i����ǜy/A7�˺4ۦ�v#�Y�W��Kx�=�7���#��B�[�jw[�Y�j㮽8xWќItzh��c������Mv���9�ɰӋ��x��n_���L|{���'���F"�8����ӷ����B�p�a��r8�&���<�}#�ӽr���Z?�         B  x�����`!D��sa
s���:p�@Y����9�@�c0��j�X��x.[?ǆ�����w(��nR^H�����E-�7|$ܐwc�_�c�H8v����&
8����d�MM��'��!p	����Dy��� 5"��HA휱����k�Z��H��z�:9E�FN���N�q@�*�9n�?�#~H��h�9���'�.�I�oe�t�@�,�2�Ii��"|O]k�gpb:�#]�'i�`ؐ��2{$I�-/���$z���T,�r_���,�JxGP`z�"��@Q���Z��i�4�Ej5�������� JB         0  x�m�1�;D�{W������ۊ� ����r�	��@�ts�ɻ�TA���u��5�:/�/���1����=��e$���;A�1�8)�����>�*>?>=O�\4A*.��;B��pm���^,���{`�$u��̖23I�ն-�F���M=�6�G��[�wһ@rp�6�$o�޵���U�����B}�����ճ��b_�a���b�(5���P╕�՟t�c4�1/�sW ��w�rr	,~.J!`W]��{t�?�7��=�������k\�؎l6�c�{�Td_�!��E	�B (LO�V;ڿ6|k��,Tͪ��W-K��W��YΖ����F�锎A�i(	S��S���S8��հ�Mm��6��N�;c=K�P?�\��x�U��x�'+�'G�*k% �i�G!�YE�j�(R4����O��x����d��cn��V�/�$;eqv������Z���(gW1l��pH�3Vm]������{�ggC��M�u���.����Q���c/�YZ����YcNԜ�p�W�s6�s�����~����         ?  x�M�=N1�z}
_`��^��*����ʂ��cD�$B)"R
�MAa�{�Mp(P���7�5L�d����rdt�T�A4��Λ@�qx�iߎ�U7��yK�HL5\�R�l$�Ӎ��ZQs��W�����xx-�~���;:�u-���6� ���&�cN@��Fy4�U�㰻��C��Zڞ��"��J�ٿLD�5�$� �
�CLJH�jc����?k��:����@���]>�mG�i^�Z2�d�0P�A[�� �3��I+VM������֑T^��G`ʗE�I��r��3�R����$.�Ӏ�cI����� ����         �  x���ɒ�H�3�:��V�F�6h(Ģ�#P�X-����w���MŌa�O>�!����2A"BY�p�<TBV���d%A<��@Ƌ������Sdg����3
�!xN��Zl�v��Կ�Z�/�k_���鎺|ݼ��j�#g0KLյ�̰K��?�a�^O�ͬL׶�I��Z�T�D��v��p��h׻{{Ժc�߭�ߑ�&Zf�g߭��X+'%=,���4s�#h�[�"3T��Ʒ��C����n��V���G�G�;��v�p�n՛��� ��8�u�}�z��,b?�o+� ����j�'� � J�X����,i�>�P��X�Y�D��<�*|�0�!��c<:_�}���xiP������j�4נjڠ�X���}���m%/�k���{�כpi]�*�]������MK��Mu����VLݴQ\5f��G#LV[���~,��ao���򜳟��_��N��3s��}љ���~�)� ��0*�K���{Q�^�b���t�Rm��Z��n�<x
����(�a�E%�C>b�$��Q=aD)K���bEĢ�YTf�l���Gl`���>~㹭�Ԁ��n�X��LP�򥳯�/���T}1�y�3��t���)Yi�t,}�x�~�{z��0��68>V��Ț�>R����_���	�5���2,q���3q�J��8���u�4l��7�V�|��z�`
�)����'����_��Z^     